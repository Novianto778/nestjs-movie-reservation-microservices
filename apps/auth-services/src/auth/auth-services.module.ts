import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthServicesController } from './auth-services.controller';
import { AuthServicesService } from './auth-services.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret') as string,
        signOptions: {
          expiresIn: configService.get<string>('jwtExpiresIn') as string,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthServicesController],
  providers: [AuthServicesService, LocalStrategy, JwtStrategy],
})
export class AuthServicesModule {}
