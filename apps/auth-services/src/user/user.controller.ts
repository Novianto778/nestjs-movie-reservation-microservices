import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserFilterDto } from './dto/user-filter.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(@Query() query: UserFilterDto) {
    const res = await this.userService.getAll(query);
    return {
      data: res,
      message: 'Success get all users',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }
}
