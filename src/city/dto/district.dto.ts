import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DistrictDto {
  @Field()
  readonly idUbigeo: number;
  @Field()
  readonly distrito: string;
  @Field()
  readonly uuid: string;
}
