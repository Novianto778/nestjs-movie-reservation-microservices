import { Test, TestingModule } from '@nestjs/testing';
import { AuthServicesController } from './auth-services.controller';
import { AuthServicesService } from './auth-services.service';

describe('AuthServicesController', () => {
  let authServicesController: AuthServicesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthServicesController],
      providers: [AuthServicesService],
    }).compile();

    authServicesController = app.get<AuthServicesController>(AuthServicesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authServicesController.getHello()).toBe('Hello World!');
    });
  });
});
