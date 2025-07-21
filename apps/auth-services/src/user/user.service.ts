import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserFilterDto } from './dto/user-filter.dto';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(filters?: UserFilterDto) {
    const take = filters?.limit || 10;
    const skip = ((filters?.page || 1) - 1) * take;
    const where = {} as Prisma.UserWhereInput;
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search } },
        { email: { contains: filters.search } },
      ];
    }

    const data = await this.databaseService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      where,
      take,
      skip,
    });

    const total = await this.databaseService.user.count({ where });
    return {
      data,
      meta: {
        total,
        page: filters?.page || 1,
        limit: take,
      },
    };
  }

  async getUserByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
