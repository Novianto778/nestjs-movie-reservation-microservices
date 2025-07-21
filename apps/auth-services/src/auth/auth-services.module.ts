import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthServicesController } from './auth-services.controller';
import { AuthServicesService } from './auth-services.service';

@Module({
  imports: [LoggerModule, DatabaseModule],
  controllers: [AuthServicesController],
  providers: [AuthServicesService],
})
export class AuthServicesModule {}
