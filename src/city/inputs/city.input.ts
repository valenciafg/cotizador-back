import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateCityInput {
  @MaxLength(5)
  @Field()
  isoCode: string;
  @MaxLength(50)
  @Field()
  provincia: string;
  @MaxLength(30)
  @Field()
  departamento: string;
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
  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  idUbigeo: number;
  /*
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  provincia: string;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  departamento: string;
  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  distrito: string;
  */
}
