import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostDto {
  @Field()
  readonly uuid: string;

  @Field()
  readonly title: string;

  @Field()
  readonly description: string;

  @Field()
  readonly content: string;

  @Field()
  readonly postType: string;

  @Field({ nullable: true })
  mainImage?: string;

  @Field(() => String, { nullable: true })
  readonly mainImageUrl?: string;

  @Field()
  readonly createdBy: string;
  @Field()
  readonly updatedBy: string;

  @Field()
  readonly createdAt: Date;

  @Field({ nullable: true })
  readonly updatedAt: Date;
}
