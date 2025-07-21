import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthServicesModule } from './auth/auth-services.module';
import * as Joi from 'joi';
import { UserModule } from './user/user.module';
import env from './config/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth-services/.env',
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3001),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
      load: [env],
    }),
    AuthServicesModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
