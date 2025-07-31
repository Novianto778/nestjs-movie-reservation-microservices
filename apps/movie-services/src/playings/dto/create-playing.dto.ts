import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreatePlayingDto {
  @IsUUID()
  movieId: string;

  @IsUUID()
  theaterId: string;

  @IsDateString()
  startTime: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsInt()
  totalSeats: number;

  @IsNumber()
  price: number;
}
