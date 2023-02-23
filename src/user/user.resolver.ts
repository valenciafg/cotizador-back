import {  UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import {  CurrentUser } from 'src/auth/decorators';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserDto } from './dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}
  @Query(returns => UserDto)
  @UseGuards(GqlAuthGuard)
  async me(
    @CurrentUser() user: User
  ) {
    return user
  }
}
