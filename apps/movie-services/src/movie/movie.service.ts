import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateMovieDto, createdBy: string) {
    return this.databaseService.movie.create({
      data: {
        ...dto,
        createdBy,
      },
    });
  }

  async findAll() {
    return this.databaseService.movie.findMany({
      include: {
        genre: true,
        playings: {
          include: {
            theater: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const movie = await this.databaseService.movie.findUnique({
      where: { id },
      include: {
        genre: true,
        playings: {
          include: {
            theater: true,
          },
        },
      },
    });

    if (!movie) throw new NotFoundException('Movie not found');
    return movie;
  }

  async update(id: string, dto: UpdateMovieDto) {
    return this.databaseService.movie.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.databaseService.movie.delete({ where: { id } });
  }
}
