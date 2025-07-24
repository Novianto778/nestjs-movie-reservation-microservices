import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter, LoggerService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './filter/prisma-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter(), new PrismaExceptionFilter());
  await app.listen(configService.get('port') ?? 3000);
}
bootstrap();
