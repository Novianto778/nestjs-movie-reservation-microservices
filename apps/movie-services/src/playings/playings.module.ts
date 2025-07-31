import { Module } from '@nestjs/common';
import { PlayingsController } from './playings.controller';
import { PlayingsService } from './playings.service';

@Module({
  controllers: [PlayingsController],
  providers: [PlayingsService]
})
export class PlayingsModule {}
