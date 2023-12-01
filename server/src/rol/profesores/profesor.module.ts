import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './profesor.entity';
import { ProfesoresController } from './profesores.controller';
import { ProfesoresService } from './profesores.service';
import { Column } from 'typeorm';
import { PersonaModule } from 'src/persona/persona.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor]), PersonaModule],
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
  exports:  [ProfesoresService],
  
})
export class ProfesorModule {
  
}
