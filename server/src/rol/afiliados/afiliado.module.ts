import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Afiliado } from './afiliado.entity';
import { AfiliadosController } from './afiliados.controller';
import { AfiliadosService } from './afiliados.service';

@Module({
  imports: [TypeOrmModule.forFeature([Afiliado])],
  controllers: [AfiliadosController],
  providers: [AfiliadosService],
  exports:  [AfiliadosService],
})
export class AfiliadoModule {}
