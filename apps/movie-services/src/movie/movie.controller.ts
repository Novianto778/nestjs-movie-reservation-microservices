import { CurrentUser, JwtAuthGuard, Roles } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(['ADMIN', 'SUPER_ADMIN'])
  async create(
    @Body() dto: CreateMovieDto,
    @CurrentUser() user: { id: string },
  ) {
    const movie = await this.movieService.create(dto, user.id);
    return {
      message: 'Movie created successfully',
      data: movie,
      statusCode: HttpStatus.CREATED,
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  async findAll() {
    const movies = await this.movieService.findAll();
    return {
      message: 'Movies fetched successfully',
      data: movies,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const movie = await this.movieService.findOne(id);
    return {
      message: 'Movie fetched successfully',
      data: movie,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['ADMIN', 'SUPER_ADMIN'])
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMovieDto,
    @CurrentUser() user: { id: string },
  ) {
    const movie = await this.movieService.update(id, dto);
    return {
      message: 'Movie updated successfully',
      data: movie,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(['ADMIN', 'SUPER_ADMIN'])
  async remove(@Param('id') id: string) {
    const movie = await this.movieService.remove(id);
    return {
      message: 'Movie deleted successfully',
      data: movie,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }
}
