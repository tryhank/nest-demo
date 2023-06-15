import { Test, TestingModule } from '@nestjs/testing';
import { CircularReferService } from './circular-refer.service';

describe('CircularReferService', () => {
  let service: CircularReferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CircularReferService],
    }).compile();

    service = module.get<CircularReferService>(CircularReferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
