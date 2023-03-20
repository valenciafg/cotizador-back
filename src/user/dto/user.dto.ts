import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class UserDto {
  @Field()
  readonly uuid: string;

  @Field()
  readonly email: string;

  @Field()
  readonly status: boolean;
  
  @Field()
  readonly registerStep: number;
  
  @Field()
  readonly userType: number;

  @Field(() => String, { nullable: true })
  readonly businessName: string;

  @Field(() => String, { nullable: true })
  readonly commercialName: string;

  @Field(() => String, { nullable: true })
  readonly lastName: string;

  @Field(() => String, { nullable: true })
  readonly name: string;

  @Field()
  readonly address: string;

  @Field()
  readonly description: string;

  @Field()
  readonly phone: string;

  @Field()
  readonly phoneCode: string;

  @Field()
  readonly optionalPhone: string;

  @Field()
  readonly optionalPhoneCode: string;


  @Field(() => [String], { nullable: true })
  readonly currentCompanies: string[];

  @Field(() => [String], { nullable: true })
  readonly workedCompanies: string[];

  @Field(() => [String], { nullable: true })
  readonly workedProjects: string[];

  @Field(() => [String], { nullable: true })
  readonly services: string[];

  @Field(() => [String], { nullable: true })
  readonly headings: string[];

  @Field(() => [String], { nullable: true })
  readonly knowledges: string[];

  @Field(() => String, { nullable: true })
  readonly departmentId: string;

  @Field(() => String, { nullable: true })
  readonly provinceId: string;

  @Field(() => String, { nullable: true })
  readonly districtId: string;

  @Field(() => String, { nullable: true })
  readonly profilePic: string;
}