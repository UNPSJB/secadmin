import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { Empresa } from './entities/empresa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadesModule } from 'src/localidades/localidades.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa]), LocalidadesModule],
  controllers: [EmpresaController],
  providers: [EmpresaService],
  exports: [EmpresaService],
})
export class EmpresaModule {}
