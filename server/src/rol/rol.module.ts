import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { AfiliadoModule } from './afiliados/afiliado.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), AfiliadoModule],
  controllers: [],
  providers: [],
  exports:  [],
})
export class RolModule {}
