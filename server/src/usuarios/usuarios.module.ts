import { Module, forwardRef } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonaModule } from 'src/persona/persona.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PersonaModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
