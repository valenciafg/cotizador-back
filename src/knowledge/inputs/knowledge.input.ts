import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

@InputType()
export class CreateKnowledgeInput {
  @MaxLength(100)
  @Transform((f) => f.value.toLocaleLowerCase())
  @Field()
  name: string;
}


@InputType()
export class FindKnowledgeInput {
  @IsString()
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  uuid: string;

  @IsString()
  @IsOptional()
  @Transform((f) => f.value.toLocaleLowerCase())
  @Field({ nullable: true })
  name: string;
}