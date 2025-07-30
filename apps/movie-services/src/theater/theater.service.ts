import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';

@Injectable()
export class TheaterService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(data: CreateTheaterDto) {
    return this.databaseService.theater.create({ data });
  }

  findAll() {
    return this.databaseService.theater.findMany();
  }

  findOne(id: string) {
    return this.databaseService.theater.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateTheaterDto) {
    return this.databaseService.theater.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.databaseService.theater.delete({ where: { id } });
  }
}
