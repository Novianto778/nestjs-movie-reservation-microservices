import { IsOptional, IsString } from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  screen?: string;
}
