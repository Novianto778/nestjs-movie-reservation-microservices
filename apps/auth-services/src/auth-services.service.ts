import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServicesService {
  getHello(): string {
    return 'Hello World!';
  }
}
