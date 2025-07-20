import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServicesService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }
}
