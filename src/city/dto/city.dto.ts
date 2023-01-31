import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class CityDto {
  @Field()
  readonly uuid: string;

  @Field()
  readonly isoCode: string;

  @Field()
  readonly name: string;

  @Field()
  readonly createdAt: Date;
  
  @Field({ nullable: true })
  readonly updatedAt: Date;
}