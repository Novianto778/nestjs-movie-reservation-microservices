import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(data: CreateGenreDto) {
    return this.databaseService.genre.create({ data });
  }

  findAll() {
    return this.databaseService.genre.findMany();
  }

  findOne(id: string) {
    return this.databaseService.genre.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateGenreDto) {
    return this.databaseService.genre.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.databaseService.genre.delete({ where: { id } });
  }
}
