import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MessageDto } from './dto';
import { CreateMessageInput, FindMessagesInput } from './inputs';
import { MessageService  } from './message.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto';

@Resolver(of => MessageDto)
export class MessageResolver {
  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  @Mutation(() => MessageDto)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args('input') input: CreateMessageInput,
    @CurrentUser() user: User,
  ) {
    return this.messageService.create(input, user.uuid);
  }
  @Query(() => [MessageDto], { nullable: 'itemsAndList' })
  @UseGuards(GqlAuthGuard)
  async messages(
    @CurrentUser() user: User,
    @Args('input') input: FindMessagesInput
  ) {
    return this.messageService.getMessages(user, input);
  }

  @ResolveField('createdBy', returns => UserDto, { nullable: true })
  async getUser(@Parent() message: MessageDto) {
    const { userId } = message;
      return this.userService.findOneByUuid(userId);
  }
}
