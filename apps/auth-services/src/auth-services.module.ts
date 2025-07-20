import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthServicesController } from './auth-services.controller';
import { AuthServicesService } from './auth-services.service';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [AuthServicesController],
  providers: [AuthServicesService],
})
export class AuthServicesModule {}
