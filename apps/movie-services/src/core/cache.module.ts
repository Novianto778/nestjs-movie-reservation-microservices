import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'ioredis';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get('redisHost'),
        port: configService.get('redisPort'),
        username: configService.get('redisUsername'),
        password: configService.get('redisPassword'),
        no_ready_check: true,
        ttl: 10,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class GlobalCacheModule {}
