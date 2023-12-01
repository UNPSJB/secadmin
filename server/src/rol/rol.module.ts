import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
<<<<<<< HEAD
import { AfiliadoModule } from './afiliados/afiliado.module';
import { ProfesorModule } from './profesores/profesor.module';
import { AlumnosModule } from './alumnos/alumnos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), AfiliadoModule, ProfesorModule, AlumnosModule],
  controllers: [],
  providers: [],
  exports:  [],
=======
import { AfiliadosController } from './afiliados/afiliados.controller';
import { Afiliado } from './afiliados/afiliado.entity';
import { AfiliadosService } from './afiliados/afiliados.service';
import { PersonaService } from 'src/persona/persona.service';
import { PersonaModule } from 'src/persona/persona.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, Afiliado]), PersonaModule],
  controllers: [AfiliadosController],
  providers: [AfiliadosService],
  exports:  [AfiliadosService],
>>>>>>> 9ad12017a14a432b8f40940c64d38239df181682
})
export class RolModule {}
