import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PostService } from './post.service'
import { PostDto } from './dto';
import { CreatePostInput, DeletePostInput, FindPostInput } from './inputs';
import { FilesService } from 'src/files/files.service';

@Resolver(of => PostDto)
export class PostResolver {
  constructor(
    private postService: PostService,
    private fileService: FilesService
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
 
 @ResolveField('mainImageUrl', returns => String, { nullable: true })
  async getImageUrl(@Parent() post: PostDto) {
    const { mainImage, createdBy } = post
    const { url = null } = await this.fileService.getUserFileUrl(mainImage, createdBy);
    return url;
  }
}
