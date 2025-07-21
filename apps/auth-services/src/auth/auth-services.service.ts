import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthServicesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async register(body: RegisterDto) {
    const { name, email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.databaseService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  }
}
