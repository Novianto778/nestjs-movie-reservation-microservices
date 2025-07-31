import { Module } from '@nestjs/common';
import { ClientProxyModule } from '../core/client-proxy.module';
import { DatabaseModule } from '../database/database.module';
import { TheaterController } from './theater.controller';
import { TheaterService } from './theater.service';

@Module({
  imports: [DatabaseModule, ClientProxyModule],
  providers: [TheaterService],
  controllers: [TheaterController],
})
export class TheaterModule {}
