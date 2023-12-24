import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('login')
  login() {
    return this.authService.login();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('signup')
  signup(
    @Body() email: string,
    @Body() matKhau: string,
    @Body() hoTen: string,
    @Body() tuoi: string,
    @Body() anhDaiDien: string,
  ) {
    return this.authService.signup(email, matKhau, hoTen, tuoi, anhDaiDien);
  }
}
