import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { KnowledgeDto } from './dto';
import { CreateKnowledgeInput, FindKnowledgeInput } from './inputs';
import { KnowledgeService } from './knowledge.service';

@Resolver()
export class KnowledgeResolver {
  constructor(
    private knowledgeService: KnowledgeService
  ) {}
  @Mutation(() => KnowledgeDto)
  async createKnowledge(
    @Args('input') input: CreateKnowledgeInput,
  ) {
    return this.knowledgeService.create(input);
  }
  @Query(() => [KnowledgeDto])
  async knowledges() {
    return this.knowledgeService.getKnowledges()
  }
  
 @Query(() => KnowledgeDto)
 async findKnowledge(
    @Args('input') input: FindKnowledgeInput
  ) {
  return this.knowledgeService.findKnowledge(input)
 }
}
