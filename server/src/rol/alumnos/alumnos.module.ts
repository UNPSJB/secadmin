import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumnos } from './alumnos.entity';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from './alumnos.service';
import { Column } from 'typeorm';
import { PersonaModule } from 'src/persona/persona.module';
import { DictadoModule } from 'src/dictado/dictado.module';

@Module({
  imports: [TypeOrmModule.forFeature([Alumnos]), PersonaModule, DictadoModule],
  controllers: [AlumnosController],
  providers: [AlumnosService],
  exports:  [AlumnosService],
  
})
export class AlumnoModule {
  
}
