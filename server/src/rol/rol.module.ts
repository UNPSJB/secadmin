import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { AfiliadoModule } from './afiliados/afiliado.module';
import { ProfesorModule } from './profesores/profesor.module';
import { AlumnosModule } from './alumnos/alumnos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), AfiliadoModule, ProfesorModule, AlumnosModule],
  controllers: [],
  providers: [],
  exports:  [],
})
export class RolModule {}
