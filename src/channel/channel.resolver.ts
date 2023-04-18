import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { get } from 'lodash';
import { ChannelDto } from './dto';
import { CreateChannelInput } from './inputs';
import { ChannelService } from './channel.service';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { USER_TYPE } from 'src/constants';

@Resolver((of) => ChannelDto)
export class ChannelResolver {
  constructor(
    private channelService: ChannelService,
    private userService: UserService,
  ) {}
  @Mutation(() => ChannelDto)
  @UseGuards(GqlAuthGuard)
  async createChannel(
    @Args('input') input: CreateChannelInput,
    @CurrentUser() user: User,
  ) {
    input.createdBy = user.uuid;
    let users = get(input, 'users', []);
    users = [user.uuid, ...users];
    return this.channelService.create({ ...input, users });
  }
  @Query(() => [ChannelDto], { nullable: 'itemsAndList' })
  @UseGuards(GqlAuthGuard)
  async channels(@CurrentUser() user: User) {
    let users = null;
    const { uuid, userType } = user;
    if (userType !== USER_TYPE.ADMINISTRATOR) {
      users = [uuid];
    }
    return this.channelService.getChannels(users);
  }
  @ResolveField('createdBy', (returns) => UserDto, { nullable: true })
  async getUser(@Parent() channel: ChannelDto) {
    const { createdBy } = channel;
    return this.userService.findOneByUuid(createdBy);
  }
  @ResolveField('users', (returns) => [UserDto], { nullable: 'itemsAndList' })
  async getUsers(@Parent() channel: ChannelDto) {
    const { users } = channel;
    const userList = [];

    for (const user of users) {
      const userResult = await this.userService.findOneByUuid(user);
      if (userResult) {
        userList.push(userResult);
      }
    }
    return userList;
  }
  /*
  
  
 @Query(() => KnowledgeDto)
 async findKnowledge(
    @Args('input') input: FindKnowledgeInput
  ) {
  return this.knowledgeService.findKnowledge(input)
 }
 */
}
