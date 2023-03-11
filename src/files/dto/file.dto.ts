import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FileDto {
  @Field()
  content: string;
  @Field()
  ext: string;
  @Field()
  mime: string;
}
