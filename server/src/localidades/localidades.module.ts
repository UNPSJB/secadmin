import { Module } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';
import { LocalidadesController } from './localidades.controller';
import { Localidades } from './entities/localidades.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Localidades])],
  controllers: [LocalidadesController],
  providers: [LocalidadesService],
})
export class LocalidadesModule {}
