import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalidadesModule } from './localidades/localidades.module';
import { AulaModule } from './aula/aula.module';
import { AuthModule } from './auth/auth.module';
import { PersonaModule } from './persona/persona.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import typeormConfig from './configuracion/typeorm';
import jwtConfig from './configuracion/jwt';
import { JwtModule } from '@nestjs/jwt';
import { EmpresaModule } from './empresa/empresa.module';
import { EmailModule } from './email/email.module';
import { CursoModule } from './curso/curso.module';
import emailConfig from './configuracion/email';
import {RolModule} from './rol/rol.module';
import { ProfesorModule } from './rol/profesores/profesor.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig,jwtConfig, emailConfig]
      
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('jwt'))
    }),
  
    LocalidadesModule,
    AulaModule,
    AuthModule,
    PersonaModule,
    UsuariosModule,
    EmpresaModule,
    EmailModule,
    CursoModule,
    RolModule,
    ProfesorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
