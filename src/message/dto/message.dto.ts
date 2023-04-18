import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageDto {
  @Field()
  readonly uuid: string;

  @Field()
  readonly channelId: string;

  @Field()
  readonly userId: string;

  @Field()
  readonly content: string;

  @Field()
  readonly createdAt: Date;

  @Field({ nullable: true })
  readonly updatedAt: Date;
}
