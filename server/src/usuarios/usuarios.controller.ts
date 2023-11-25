import { Body, Controller, Post, Query, Req } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';
import { ChangePasswordDto } from './dto/change.password.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuarioService: UsuariosService) {}


    @Public()
    @Post()
    crearUsuario(
        @Body() crearUsuarioDTO: CrearUsuarioDto
    ){
        const {id, email, password } = crearUsuarioDTO;

        return this.usuarioService.generarUsuarioAPersona(id, email, password)
    }

    @Post('change-password')
    async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Req() req){
        
        const {contraseñaActual, nuevaContraseña, confirmarContraseña} = changePasswordDto;
        await this.usuarioService.cambiarContraseña(req.user.sub, contraseñaActual,nuevaContraseña, confirmarContraseña)
        return {mensaje: "Contraseña actualizada correctamente"};
    }
}
