import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service'
import { PostDto } from './dto';
import { CreatePostInput, DeletePostInput, FindPostInput } from './inputs';

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
  @Mutation(() => Boolean)
  async deletePost(
    @Args('input') input: DeletePostInput,
  ) {
    return this.postService.deletePost(input.uuid);
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
