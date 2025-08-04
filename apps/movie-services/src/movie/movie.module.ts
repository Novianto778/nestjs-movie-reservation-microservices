import { CacheService } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientProxyModule } from '../core/client-proxy.module';
import { DatabaseModule } from '../database/database.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { CloudinaryModule } from '@app/file-upload';
@Module({
  imports: [DatabaseModule, ClientProxyModule, CloudinaryModule],
  controllers: [MovieController],
  providers: [MovieService, CacheService],
})
export class MovieModule {}
