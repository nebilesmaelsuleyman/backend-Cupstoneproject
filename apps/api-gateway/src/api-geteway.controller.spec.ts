import { Test, TestingModule } from '@nestjs/testing';
import { ApiGetewayController } from './api-geteway.controller';
import { ApiGetewayService } from './api-geteway.service';

describe('ApiGetewayController', () => {
  let apiGetewayController: ApiGetewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiGetewayController],
      providers: [ApiGetewayService],
    }).compile();

    apiGetewayController = app.get<ApiGetewayController>(ApiGetewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiGetewayController.getHello()).toBe('Hello World!');
    });
  });
});
