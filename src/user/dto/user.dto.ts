import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class UserDto {
  @Field()
  readonly uuid: string;

  @Field()
  readonly email: string;

  @Field()
  readonly status: boolean;
  
  @Field()
  readonly registerStep: number;
  
  @Field()
  readonly userType: number;
}