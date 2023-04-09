import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

@InputType()
export class CreateChannelInput {
  @MaxLength(100)
  @IsString()
  @Field()
  name: string;

  @Field(() => [String])
  @IsOptional()
  @IsArray()
  users: string[];
}