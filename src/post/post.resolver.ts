import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PostService } from './post.service'
import { PostDto } from './dto';
import { CreatePostInput, DeletePostInput, FindPostInput } from './inputs';
import { FilesService } from 'src/files/files.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/auth/decorators';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

@Resolver(of => PostDto)
export class PostResolver {
  constructor(
    private postService: PostService,
    private fileService: FilesService,
    private userService: UserService
  ) {}
  @Mutation(() => PostDto)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @CurrentUser() user: User,
    @Args('input') input: CreatePostInput,
  ) {
    return this.postService.create(input, user.uuid);
  }
  @Mutation(() => Boolean)
  async deletePost(
    @Args('input') input: DeletePostInput,
  ) {
    return this.postService.deletePost(input.uuid);
  }
  @Query(() => [PostDto])
  @UseGuards(GqlAuthGuard)
  async posts(
    @CurrentUser() user: User,
  ) {
    return this.postService.getPosts(user.uuid)
  }
  
 @Query(() => PostDto, { nullable: true })
 async post(
    @Args('input') input: FindPostInput
  ) {
  return this.postService.findPost(input)
 }
 
 @ResolveField('mainImageUrl', returns => String, { nullable: true })
  async getImageUrl(@Parent() post: PostDto) {
    const { mainImage } = post;
    if (!mainImage) {
      return null;
    }
    const { url = null } = await this.fileService.getUserFileUrl(mainImage);
    return url;
  }
  @ResolveField('createdBy', returns => UserDto, { nullable: true })
  async getdeparment(@Parent() post: PostDto) {
    const { createdBy } = post;
    const result = await this.userService.findOneByUuid(createdBy);
    // const [result] = await this.cityService.getDeparments(departmentId)
    // return result ? result : null
    return result;
  }
}
