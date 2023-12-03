import { Module } from '@nestjs/common';
import { DictadoService } from './dictado.service';
import { DictadoController } from './dictado.controller';
import { Dictado } from './entities/dictado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AulaModule } from 'src/aula/aula.module';
import { ProfesorModule } from 'src/rol/profesores/profesor.module';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dictado]), AulaModule, ProfesorModule, CursoModule],
  controllers: [DictadoController],
  providers: [DictadoService],
  exports: [DictadoService]
})
export class DictadoModule {}
