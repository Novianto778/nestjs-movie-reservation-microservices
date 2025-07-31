import { IsUUID } from 'class-validator';
import { CreatePlayingDto } from './create-playing.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePlayingDto extends PartialType(CreatePlayingDto) {
  @IsUUID()
  id: string;
}
