import { Test, TestingModule } from '@nestjs/testing';
import { InternalApiController } from './internal-api.controller';
import { InternalApiService } from './internal-api.service';

describe('InternalApiController', () => {
  let internalApiController: InternalApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InternalApiController],
      providers: [InternalApiService],
    }).compile();

    internalApiController = app.get<InternalApiController>(InternalApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(internalApiController.getHello()).toBe('Hello World!');
    });
  });
});
