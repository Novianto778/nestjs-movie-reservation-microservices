import { NestFactory } from '@nestjs/core';
import { AuthServicesModule } from './auth-services.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthServicesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
