import { resMapper } from '@app/utils';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const res = await this.authService.register(body);

    return {
      data: resMapper(RegisterResponseDto, res),
      message: 'Success register',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() body: LoginDto) {
    const res = await this.authService.login(body);

    return {
      data: resMapper(LoginResponseDto, res),
      message: 'Success login',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  authenticate(@Payload() payload: { token: string }) {
    const res = this.authService.validateToken(payload.token);
    return res;
  }
}
