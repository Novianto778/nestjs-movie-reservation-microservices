import { AUTH_SERVICE, CacheService } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '../database/database.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
@Module({
  imports: [
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('authHost') ?? '127.0.0.1',
            port: configService.get<number>('authPort') ?? 6000,
          },
        }),

        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MovieController],
  providers: [MovieService, CacheService],
})
export class MovieModule {}
