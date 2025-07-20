import { Controller, Get } from '@nestjs/common';
import { AuthServicesService } from './auth-services.service';

@Controller()
export class AuthServicesController {
  constructor(private readonly authServicesService: AuthServicesService) {}

  @Get()
  getHello(): string {
    return this.authServicesService.getHello();
  }
}
