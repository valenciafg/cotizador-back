import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgeResolver } from './knowledge.resolver';

describe('KnowledgeResolver', () => {
  let resolver: KnowledgeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnowledgeResolver],
    }).compile();

    resolver = module.get<KnowledgeResolver>(KnowledgeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
