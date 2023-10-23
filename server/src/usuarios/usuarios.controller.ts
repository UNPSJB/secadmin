import { Body, Controller, Post, Query } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { UsuariosService } from './usuarios.service';

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
}
