import { LoggerService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ProxyMiddleware } from './proxy.middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  app.useLogger(app.get(LoggerService));
  app.use('/api', new ProxyMiddleware().use);
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
