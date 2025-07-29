import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { DatabaseModule } from '../database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';
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
  providers: [GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
