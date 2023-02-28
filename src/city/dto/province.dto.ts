import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class ProvinceDto {
  @Field()
  readonly provinciaInei: string;
  @Field()
  readonly provincia: string;
}