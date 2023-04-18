import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class KnowledgeDto {
  @Field()
  readonly uuid: string;

  @Field()
  readonly name: string;

  @Field()
  readonly createdAt: Date;

  @Field({ nullable: true })
  readonly updatedAt: Date;
}
