import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChannelDto } from './dto';
import { CreateChannelInput } from './inputs';
import { ChannelService } from './channel.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/user/entities/user.entity';

@Resolver()
export class ChannelResolver {
  constructor(
    private channelService: ChannelService
  ) {}
  @Mutation(() => ChannelDto)
  @UseGuards(GqlAuthGuard)
  
  async createChannel(
    @Args('input') input: CreateChannelInput,
    @CurrentUser() user: User,
  ) {
    return this.channelService.create(input);
  }
  /*
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
 */
}
