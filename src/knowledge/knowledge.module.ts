import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeResolver } from './knowledge.resolver';
import { Knowledge, KnowledgeSchema } from './entities';

@Module({
  providers: [KnowledgeService, KnowledgeResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: Knowledge.name,
        schema: KnowledgeSchema,
      },
    ]),
  ],
  exports: [KnowledgeService],
})
export class KnowledgeModule {}
