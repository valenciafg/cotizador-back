import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsUUID } from "class-validator";

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

@InputType()
export class SearchUsersOptions {

  @Field({ defaultValue: 1 })
  @IsNumber()
  @IsOptional()
  page: number;

  @Field({ defaultValue: 15 })
  @IsNumber()
  @IsOptional()
  limit: number;
}