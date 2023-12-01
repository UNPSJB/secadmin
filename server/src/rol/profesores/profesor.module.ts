import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesores } from './profesor.entity';
import { ProfesoresController } from './profesores.controller';
import { ProfesoresService } from './profesores.service';
import { Column } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Profesores])],
  controllers: [ProfesoresController],
  providers: [ProfesoresService],
  exports:  [ProfesoresService],
})
export class ProfesorModule {
  
}
