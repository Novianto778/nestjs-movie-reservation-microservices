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
import { RolesGuard } from '@app/common/guards';
import { Roles } from '@app/common/decorators/roles.decorator';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { JwtAuthGuard } from '@app/common';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['ADMIN', 'SUPER_ADMIN'])
@Controller('movies/genres')
export class GenreController {
  constructor(private readonly service: GenreService) {}

  @Post()
  async create(@Body() dto: CreateGenreDto) {
    const res = await this.service.create(dto);
    return {
      message: 'Genre created successfully',
      data: res,
      statusCode: HttpStatus.CREATED,
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  async findAll() {
    const res = await this.service.findAll();
    return {
      message: 'Genres fetched successfully',
      data: res,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.service.findOne(id);
    return {
      message: 'Genre fetched successfully',
      data: res,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    const res = await this.service.update(id, dto);
    return {
      message: 'Genre updated successfully',
      data: res,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.service.remove(id);
    return {
      message: 'Genre deleted successfully',
      data: res,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }
}
