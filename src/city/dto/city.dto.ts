import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class CityDto {
  /*
  @Field()
  readonly uuid: string;

  @Field()
  readonly isoCode: string;

  @Field()
  readonly name: string;

  @Field()
  readonly createdAt: Date;
  
  @Field({ nullable: true })
  readonly updatedAt: Date;
  */
  @Field()
  readonly uuid: string;
  @Field()
  readonly idUbigeo: number;
  @Field()
  readonly ubigeoReniec: string;
  @Field()
  readonly ubigeoInei: string;
  @Field()
  readonly departamentoInei: string;
  @Field()
  readonly departamento: string;
  @Field()
  readonly provinciaInei: string;
  @Field()
  readonly provincia: string;
  @Field()
  readonly distrito: string;
  @Field()
  readonly region: string;
  @Field()
  readonly macroregionInei: string;
  @Field()
  readonly macroregionMinsa: string;
  @Field()
  readonly isoCode: string;
  @Field()
  readonly fips: string;
  @Field()
  readonly superficie: number;
  @Field()
  readonly altitud: number;
  @Field()
  readonly latitud: number;
  @Field()
  readonly longitud: number;
  @Field()
  readonly frontera: string;
  @Field()
  readonly createdAt: Date;
  @Field({ nullable: true })
  readonly updatedAt: Date;
}