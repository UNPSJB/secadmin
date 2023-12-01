import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumnos } from './alumnos.entity';
import { AlumnosController } from './alumnos.controller';
import { AlumnosService } from './alumnos.service';
import { Column } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Alumnos])],
  controllers: [AlumnosController],
  providers: [AlumnosService],
  exports:  [AlumnosService],
})
export class AlumnosModule {
  
}
