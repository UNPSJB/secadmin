import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';

@Module({

  imports: [
    ConfigModule,
    forwardRef(() => UsuariosModule),
    JwtModule, 
    EmailModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
