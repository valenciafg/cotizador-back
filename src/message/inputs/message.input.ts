import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

@InputType()
export class CreateMessageInput {
  @IsString()
  @Field()
  content: string;

  @Field()
  @IsOptional()
  @IsString()
  channelId: string;
}

@InputType()
export class FindMessagesInput {
  @Field()
  @IsString()
  @IsUUID()
  channelId: string;
}