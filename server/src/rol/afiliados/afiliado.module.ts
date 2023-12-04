import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afiliado } from './afiliado.entity';
import { AfiliadosController } from './afiliados.controller';
import { AfiliadosService } from './afiliados.service';
import { Column } from 'typeorm';
import { PersonaModule } from 'src/persona/persona.module';
import { DictadoModule } from 'src/dictado/dictado.module';
import { CursoModule } from 'src/curso/curso.module';

@Module({
  imports: [TypeOrmModule.forFeature([Afiliado]), PersonaModule, DictadoModule, CursoModule],
  controllers: [AfiliadosController],
  providers: [AfiliadosService],
  exports:  [AfiliadosService],
  
})
export class AfiliadoModule {
  
}
