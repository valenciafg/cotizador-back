import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";

@InputType()
export class SearchUsersInput {
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  serviceId: string;
  @IsOptional()
  @Field({ nullable: true })
  deparmentId: string;
  @IsOptional()
  @Field({ nullable: true })
  provinceId: string;
  @IsOptional()
  @Field({ nullable: true })
  districtId: string;
}