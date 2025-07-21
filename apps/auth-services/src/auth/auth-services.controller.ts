import { resMapper } from '@app/common';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthServicesService } from './auth-services.service';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthServicesController {
  constructor(private readonly authServicesService: AuthServicesService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const res = await this.authServicesService.register(body);

    return resMapper(RegisterResponseDto, res);
  }
}
