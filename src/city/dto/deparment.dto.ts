import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeparmentDto {
  @Field()
  readonly departamentoInei: string;
  @Field()
  readonly departamento: string;
}
