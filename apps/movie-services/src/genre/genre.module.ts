import { CacheService } from '@app/common';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { ClientProxyModule } from '../core/client-proxy.module';
@Module({
  imports: [DatabaseModule, ClientProxyModule],
  providers: [GenreService, CacheService],
  controllers: [GenreController],
})
export class GenreModule {}
