import { Role } from '../../../generated/prisma';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class PromoteUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
