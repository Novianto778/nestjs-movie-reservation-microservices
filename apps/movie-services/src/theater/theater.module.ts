import { Module } from '@nestjs/common';
import { TheaterService } from './theater.service';
import { TheaterController } from './theater.controller';
import { DatabaseModule } from '../database/database.module';
import { ClientsModule } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

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
  providers: [TheaterService],
  controllers: [TheaterController],
})
export class TheaterModule {}
