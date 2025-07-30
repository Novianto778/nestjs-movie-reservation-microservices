import { PaginationDto } from '@app/common';
import { IsOptional, IsString } from 'class-validator';

export class QueryMovieDto extends PaginationDto {
  @IsOptional()
  @IsString()
  genreId?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
