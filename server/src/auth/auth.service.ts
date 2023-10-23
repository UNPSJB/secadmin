import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    saltOrRounds = 10;

    constructor(
        private usersService: UsuariosService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne({ email });

        if (!user) {
            return new UnauthorizedException("No se encontro ese usuario o la contraseña no es correcta");
        }

        
        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            return new UnauthorizedException("No se encontro ese usuario o la contraseña no es correcta");
        }

        const payload = {
            sub: user.id,
            email: user.email,
            nombre: user.persona.nombre,
            apellido: user.persona.apellido,
            dni: user.persona.dni
        };

        const jwtConfig = this.configService.get('jwt')

        return {
            access_token: await this.jwtService.signAsync(
                payload,
                { secret: jwtConfig.secret }
            ),
        };
    }

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltOrRounds);

    }
}