import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './configuracion/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadesModule } from './localidades/localidades.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    LocalidadesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
