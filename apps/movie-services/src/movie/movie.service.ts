import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { CacheService } from '@app/common';
import { REDIS_KEY } from '../constants/redis-key';
import { QueryMovieDto } from './dto/query-movie.dto';
import { generateUploadSignature } from '@app/file-upload';

@Injectable()
export class MovieService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly cacheService: CacheService,
    @Inject('CLOUDINARY') private readonly cloudinary,
  ) {}

  async getSignedParams(folder: string) {
    return generateUploadSignature({
      folder: folder || 'movie',
    });
  }

  async updatePosterUrl(id: string, url: string) {
    const movie = await this.databaseService.movie.update({
      where: { id },
      data: {
        posterUrl: url,
      },
    });
    return movie;
  }

  async create(dto: CreateMovieDto, createdBy: string) {
    if (!createdBy) throw new UnauthorizedException('Unauthorized');

    const genre = await this.databaseService.genre.findUnique({
      where: { id: dto.genreId },
    });

    if (!genre) throw new NotFoundException('Genre not found');

    const cachedMovies = await this.cacheService.get(REDIS_KEY.MOVIES);
    if (cachedMovies) {
      await this.cacheService.del(REDIS_KEY.MOVIES);
    }

    return this.databaseService.movie.create({
      data: {
        ...dto,
        createdBy,
      },
    });
  }

  async findAll(query: QueryMovieDto) {
    const { genreId, search, page, limit } = query;
    const take = limit || 10;
    const currentPage = page || 1;
    const skip = (currentPage - 1) * take;
    const arrayGenreId = genreId?.split(',') || [];

    const movies = await this.cacheService.get(
      REDIS_KEY.MOVIES_PAGINATED(currentPage, take, genreId, search),
    );
    const cachedTotal = await this.cacheService.get<number>(
      REDIS_KEY.MOVIES_TOTAL_COUNT(currentPage, take, genreId, search),
    );

    if (movies && cachedTotal) {
      return {
        data: movies,
        meta: {
          totalPages: Math.ceil(cachedTotal / take),
          currentPage,
          totalItems: cachedTotal,
        },
      };
    }
    const res = await this.databaseService.movie.findMany({
      include: {
        genre: true,
        playings: {
          include: {
            theater: true,
          },
        },
      },
      take,
      skip,
      where: {
        genreId: {
          in: arrayGenreId,
        },
        title: {
          contains: search,
        },
      },
    });

    const total = await this.databaseService.movie.count({
      where: {
        genreId: {
          in: arrayGenreId,
        },
        title: {
          contains: search,
        },
      },
    });

    const totalPages = Math.ceil(total / take);

    await this.cacheService.set(
      REDIS_KEY.MOVIES_PAGINATED(currentPage, take, genreId, search),
      res,
    );
    await this.cacheService.set(
      REDIS_KEY.MOVIES_TOTAL_COUNT(currentPage, take, genreId, search),
      total,
    );
    return {
      data: res,
      meta: {
        totalPages,
        currentPage,
        totalItems: total,
      },
    };
  }

  async findOne(id: string) {
    const movie = await this.cacheService.get(REDIS_KEY.MOVIES_BY_ID(id));
    if (movie) {
      return movie;
    }
    const res = await this.databaseService.movie.findUnique({
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

    if (!res) throw new NotFoundException('Movie not found');
    await this.cacheService.set(REDIS_KEY.MOVIES_BY_ID(id), res);
    return res;
  }

  async update(id: string, dto: UpdateMovieDto) {
    const res = await this.databaseService.movie.update({
      where: { id },
      data: dto,
    });
    await this.cacheService.set(REDIS_KEY.MOVIES_BY_ID(id), res);
    await this.cacheService.del(REDIS_KEY.MOVIES);
    return res;
  }

  async remove(id: string) {
    await this.cacheService.del(REDIS_KEY.MOVIES_BY_ID(id));
    return this.databaseService.movie.delete({ where: { id } });
  }
}
