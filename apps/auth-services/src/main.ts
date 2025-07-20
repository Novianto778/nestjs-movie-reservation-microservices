import { LoggerService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthServicesModule } from './auth-services.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServicesModule);
  const configService = app.get(ConfigService);
  app.useLogger(app.get(LoggerService));
  await app.listen(configService.get('PORT') ?? 3001);
}
bootstrap();
