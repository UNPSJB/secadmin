import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
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
})
export class RolModule {}
