import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreatePlayingDto } from './dto/create-playing.dto';
import { UpdatePlayingDto } from './dto/update-playing.dto';

@Injectable()
export class PlayingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(data: CreatePlayingDto) {
    return this.databaseService.playing.create({ data });
  }

  findAll() {
    return this.databaseService.playing.findMany({
      include: { movie: true, theater: true },
    });
  }

  findOne(id: string) {
    return this.databaseService.playing.findUnique({
      where: { id },
      include: { movie: true, theater: true },
    });
  }

  update(id: string, data: UpdatePlayingDto) {
    return this.databaseService.playing.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.databaseService.playing.delete({ where: { id } });
  }
}
