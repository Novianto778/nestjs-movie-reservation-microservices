import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  app.useLogger(app.get(LoggerService));
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
