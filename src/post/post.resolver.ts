import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service'
import { PostDto } from './dto';
import { CreatePostInput, FindPostInput } from './inputs';

@Resolver()
export class PostResolver {
  constructor(
    private postService: PostService
  ) {}
  @Mutation(() => PostDto)
  async createPost(
    @Args('input') input: CreatePostInput,
  ) {
    return this.postService.create(input);
  }
  @Query(() => [PostDto])
  async posts() {
    return this.postService.getPosts()
  }
  
 @Query(() => PostDto)
 async findPosts(
    @Args('input') input: FindPostInput
  ) {
  return this.postService.findPost(input)
 }
}
