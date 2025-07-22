import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@app/common/guards';
import { Role, User } from 'apps/auth-services/generated/prisma';
import { Roles } from '@app/common';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { AuthorizeUserGuard } from '@app/common/guards/authorize-user.guard';
import { PromoteUserDto } from './dto/promote-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard<Role>)
  @Roles<Role>(
    ['ADMIN', 'SUPER_ADMIN'],
    'You are not authorized to access this resource',
  )
  @Get()
  async getAll(@Query() query: UserFilterDto) {
    const res = await this.userService.getAll(query);
    return {
      data: res.data,
      meta: res.meta,
      message: 'Success get all users',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async profile(@CurrentUser() user: User) {
    return {
      data: user,
      message: 'Success get profile',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard('jwt'), AuthorizeUserGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    const res = await this.userService.getUserById(id);
    return {
      data: res,
      message: 'Success get user',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard<Role>)
  @Roles<Role>(
    ['SUPER_ADMIN'],
    'You are not authorized to access this resource',
  )
  @Put('promote')
  async promoteUser(@Body() body: PromoteUserDto) {
    const res = await this.userService.promoteUser(body);
    return {
      data: res,
      message: 'Success promote user',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }
}
