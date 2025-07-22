import { resMapper } from '@app/utils';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { AuthServicesService } from './auth-services.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthServicesController {
  constructor(
    private readonly authServicesService: AuthServicesService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const res = await this.authServicesService.register(body);

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
    const res = await this.authServicesService.login(body);

    return {
      data: resMapper(LoginResponseDto, res),
      message: 'Success login',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }
}
