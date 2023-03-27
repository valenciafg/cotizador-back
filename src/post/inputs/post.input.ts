import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreatePostInput {
  @MaxLength(200)
  @Field()
  title: string;

  @MaxLength(500)
  @Field()
  description: string;

  @Field()
  @IsString()
  @MinLength(1)
  content: string;

  @Field()
  @IsString()
  @MinLength(1)
  postType: string;

  @Field({ nullable: true })
  @IsOptional()
  mainImage?: string;
}
/*
@InputType()
export class UpdateCityInput {
  @Field()
  readonly name: string;
}
*/

@InputType()
export class FindPostInput {
  @IsString()
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  uuid: string;
}

@InputType()
export class DeletePostInput {
  @IsString()
  @IsUUID()
  @Field()
  uuid: string
}
