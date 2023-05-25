import { Controller, Get, Post, Body, HttpCode, HttpStatus, Request,
    UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthUserDto } from './dtos/auth-user.dto';


@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}

@HttpCode(HttpStatus.OK)
@Post('signin')
signIn(@Body() signInDto: AuthUserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
}


}

