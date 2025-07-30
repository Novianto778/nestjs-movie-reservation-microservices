import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { CacheService } from '@app/common';
import { REDIS_KEY } from '../constants/redis-key';

@Injectable()
export class GenreService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cacheService: CacheService,
  ) {}

  async create(data: CreateGenreDto) {
    const res = await this.databaseService.genre.create({ data });
    await this.cacheService.del(REDIS_KEY.GENRES);
    return res;
  }

  async findAll() {
    const genres = await this.cacheService.get(REDIS_KEY.GENRES);
    if (genres) {
      return genres;
    }
    const res = await this.databaseService.genre.findMany();

    await this.cacheService.set(REDIS_KEY.GENRES, res);
    return res;
  }

  async findOne(id: string) {
    const genre = await this.cacheService.get(REDIS_KEY.GENRES_BY_ID(id));
    if (genre) {
      return genre;
    }
    const res = await this.databaseService.genre.findUnique({ where: { id } });

    await this.cacheService.set(REDIS_KEY.GENRES_BY_ID(id), res);
    return res;
  }

  async update(id: string, dto: UpdateGenreDto) {
    const res = await this.databaseService.genre.update({
      where: { id },
      data: dto,
    });
    await this.cacheService.set(REDIS_KEY.GENRES_BY_ID(id), res);
    await this.cacheService.del(REDIS_KEY.GENRES);
    return res;
  }

  async remove(id: string) {
    await this.cacheService.del(REDIS_KEY.GENRES_BY_ID(id));
    await this.cacheService.del(REDIS_KEY.GENRES);
    return this.databaseService.genre.delete({ where: { id } });
  }
}
