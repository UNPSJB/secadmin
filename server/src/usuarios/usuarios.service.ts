import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuarios.entity';
import { Repository } from 'typeorm';
import { PersonaService } from 'src/persona/persona.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario) private repo: Repository<Usuario>,
        private personaService: PersonaService,    
        @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    ) {}
    
    findOne(filter) {
        return this.repo.findOne({where:filter, relations:["persona"]})
    }

    async generarUsuarioAPersona(id:number, email:string, password:string){
        const persona = await this.personaService.findOne(id);
        
        if (!persona) {
            throw new NotFoundException("No se encontró la persona");
        }

        const hashedPassword = await this.authService.hashPassword(password);

        const usuario = this.repo.create({
            email,
            password:hashedPassword,
            persona
        });

        return this.repo.save(usuario);
    }
}
