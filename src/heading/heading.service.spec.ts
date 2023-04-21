import { Test, TestingModule } from '@nestjs/testing';
import { HeadingService } from './heading.service';
import { getModelToken } from '@nestjs/mongoose';
import { Heading } from './entities';

describe('HeadingService', () => {
  let service: HeadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeadingService,
        {
          provide: getModelToken(Heading.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HeadingService>(HeadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
