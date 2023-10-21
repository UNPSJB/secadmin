import { Module } from '@nestjs/common';
import { LocalidadesController } from './localidades.controller';
import { LocalidadesService } from './localidades.service';
import { Localidades } from './localidades.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Localidades])],
  controllers: [LocalidadesController],
  providers: [LocalidadesService]
})
export class LocalidadesModule {}
