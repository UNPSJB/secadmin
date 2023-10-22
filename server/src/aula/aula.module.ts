import { Module } from '@nestjs/common';
import { AulaService } from './aula.service';
import { AulaController } from './aula.controller';
import { Aula } from './entities/aula.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadesModule } from 'src/localidades/localidades.module';

@Module({
  imports: [TypeOrmModule.forFeature([Aula]), LocalidadesModule],
  controllers: [AulaController],
  providers: [AulaService],
  exports: [AulaService],

})
export class AulaModule {}
