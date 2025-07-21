import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    const res = await this.userService.getAll();
    return {
      data: res,
      message: 'Success get all users',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }
}
