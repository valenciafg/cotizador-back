import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ChannelDto {
  @Field()
  readonly uuid: string;

  @Field()
  readonly name: string;

  @Field()
  readonly createdBy: string;

  @Field(() => [String])
  readonly users: string[];

  @Field()
  readonly status: string;

  @Field()
  readonly createdAt: Date;
  
  @Field({ nullable: true })
  readonly updatedAt: Date;
}