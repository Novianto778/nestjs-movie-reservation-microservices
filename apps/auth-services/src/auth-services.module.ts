import { Module } from '@nestjs/common';
import { AuthServicesController } from './auth-services.controller';
import { AuthServicesService } from './auth-services.service';

@Module({
  imports: [],
  controllers: [AuthServicesController],
  providers: [AuthServicesService],
})
export class AuthServicesModule {}
