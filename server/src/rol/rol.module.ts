import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { ProfesorModule } from './profesores/profesor.module';



@Module({
  imports: [TypeOrmModule.forFeature([Rol]), ProfesorModule ],
  controllers: [],
  providers: [],
  exports:  [],
})
export class RolModule {}
