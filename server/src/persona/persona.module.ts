import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Nacionalidad } from './entities/nacionalidades.entity';
import { LocalidadesModule } from 'src/localidades/localidades.module';

@Module({
  imports: [TypeOrmModule.forFeature([Persona, Nacionalidad]), LocalidadesModule],
  controllers: [PersonaController],
  providers: [PersonaService],
  exports: [PersonaService],
})
export class PersonaModule {}
