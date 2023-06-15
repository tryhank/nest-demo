import { Test, TestingModule } from '@nestjs/testing';
import { CircularReferController } from './circular-refer.controller';
import { CircularReferService } from './circular-refer.service';

describe('CircularReferController', () => {
  let controller: CircularReferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CircularReferController],
      providers: [CircularReferService],
    }).compile();

    controller = module.get<CircularReferController>(CircularReferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
