import { JwtAuthGuard } from '@app/common';
import { Roles } from '@app/common/decorators/roles.decorator';
import { RolesGuard } from '@app/common/guards';
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
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { TheaterService } from './theater.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['ADMIN', 'SUPER_ADMIN'])
@Controller('theaters')
export class TheaterController {
  constructor(private readonly service: TheaterService) {}

  @Post()
  async create(@Body() dto: CreateTheaterDto) {
    const res = await this.service.create(dto);
    return {
      message: 'Theater created successfully',
      data: res,
      statusCode: HttpStatus.CREATED,
      timestamp: new Date().toISOString(),
    };
  }

  @Get()
  async findAll() {
    const res = await this.service.findAll();
    return {
      message: 'Theaters fetched successfully',
      data: res,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.service.findOne(id);
    return {
      message: 'Theater fetched successfully',
      data: res,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTheaterDto) {
    const res = await this.service.update(id, dto);
    return {
      message: 'Theater updated successfully',
      data: res,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.service.remove(id);
    return {
      message: 'Theater deleted successfully',
      data: res,
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
    };
  }
}
