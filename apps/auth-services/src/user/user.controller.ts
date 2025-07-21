import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@app/common/guards';
import { Role, User } from 'apps/auth-services/generated/prisma';
import { Roles } from '@app/common';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';

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
  @Get('profile')
  async profile(@CurrentUser() user: User) {
    return {
      data: user,
      message: 'Success get profile',
      status: true,
      statusCode: HttpStatus.OK,
    };
  }
}
