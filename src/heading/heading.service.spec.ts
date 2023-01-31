import { Test, TestingModule } from '@nestjs/testing';
import { HeadingService } from './heading.service';

describe('HeadingService', () => {
  let service: HeadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadingService],
    }).compile();

    service = module.get<HeadingService>(HeadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
