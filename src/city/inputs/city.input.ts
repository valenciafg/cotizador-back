import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

@InputType()
export class CreateCityInput {
  @MaxLength(5)
  @Field()
  isoCode: string;

  @MaxLength(30)
  @Field()
  name: string;
}
/*
@InputType()
export class UpdateCityInput {
  @Field()
  readonly name: string;
}
*/

@InputType()
export class FindCityInput {
  @IsString()
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  uuid: string;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  isoCode: string;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;
}
