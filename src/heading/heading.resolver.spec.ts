import { Test, TestingModule } from '@nestjs/testing';
import { HeadingResolver } from './heading.resolver';

describe('HeadingResolver', () => {
  let resolver: HeadingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadingResolver],
    }).compile();

    resolver = module.get<HeadingResolver>(HeadingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
