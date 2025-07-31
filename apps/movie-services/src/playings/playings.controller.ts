import { JwtAuthGuard } from '@app/common';
import { Roles } from '@app/common/decorators/roles.decorator';
import { RolesGuard } from '@app/common/guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreatePlayingDto } from './dto/create-playing.dto';
import { UpdatePlayingDto } from './dto/update-playing.dto';
import { PlayingsService } from './playings.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['ADMIN', 'SUPER_ADMIN'])
@Controller('playings')
export class PlayingsController {
  constructor(private readonly service: PlayingsService) {}

  @Post()
  create(@Body() dto: CreatePlayingDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePlayingDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
