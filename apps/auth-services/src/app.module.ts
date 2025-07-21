import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthServicesModule } from './auth/auth-services.module';
import * as Joi from 'joi';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth-services/.env',
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3001),
      }),
    }),
    AuthServicesModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
