import { RegisterResponseDto } from './register-response.dto';
import { Expose, Type } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  @Type(() => RegisterResponseDto)
  user: RegisterResponseDto;

  @Expose()
  token: string;
}
