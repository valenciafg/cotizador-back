import { Module } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeResolver } from './knowledge.resolver';

@Module({
  providers: [KnowledgeService, KnowledgeResolver]
})
export class KnowledgeModule {}
