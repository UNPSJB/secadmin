import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('recover-password')
    recoverPassword(@Body() recoverPasswordDto: Record<string, any>) {
      return this.authService.recoverPassword(recoverPasswordDto.email);
    }

}
