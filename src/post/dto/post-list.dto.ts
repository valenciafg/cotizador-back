import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostDto } from './post.dto';

@ObjectType()
export class PostListDto {
  @Field()
  pages: number;
  @Field()
  currentPage: number;
  @Field(() => [PostDto], { nullable: 'itemsAndList' })
  posts: PostDto[];
}
