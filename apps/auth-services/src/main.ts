import { AllExceptionsFilter, LoggerService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaExceptionFilter } from '../filter/prisma-exceptions.filter';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get<number>('tcpPort') ?? 6000,
    },
  });

  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter(), new PrismaExceptionFilter());
  await app.startAllMicroservices();
  await app.listen(configService.get('port') ?? 3001);
}
bootstrap();
