import { AUTH_SERVICE, LoggerModule } from '@app/common';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import env from './config/env';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { ClientsModule } from '@nestjs/microservices';
import { TheaterModule } from './theater/theater.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'ioredis';
import { GlobalCacheModule } from './core/cache.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/movie-services/.env',
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3001),
        AUTH_PORT: Joi.number().default(6000),
        AUTH_HOST: Joi.string().default('127.0.0.1'),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
      }),
      load: [env],
    }),
    GlobalCacheModule,
    MovieModule,
    GenreModule,
    TheaterModule,
  ],
})
export class AppModule {}
