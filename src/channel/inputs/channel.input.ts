import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

@InputType()
export class CreateChannelInput {
  @MaxLength(100)
  @IsString()
  @Field()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  createdBy: string;

  @Field(() => [String], { nullable: 'itemsAndList' } )
  @IsOptional()
  @IsArray()
  users?: string[];
}

@InputType()
export class FindChannelInput {
  @Field()
  @IsUUID()
  uuid: string;

  @Field(() => [String], { nullable: 'itemsAndList' } )
  @IsOptional()
  @IsArray()
  users?: string[];
}