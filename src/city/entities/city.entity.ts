import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { genUUID } from '../../utils';

@Schema()
export class City extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  @ApiProperty()
  uuid: string;
  @Prop()
  isoCode: string;
  //
  @Prop({
    index: true,
    unique: true,
  })
  idUbigeo: number;
  @Prop()
  ubigeoReniec: string;
  @Prop()
  ubigeoInei: string;
  @Prop()
  departamentoInei: string;
  @Prop()
  departamento: string;
  @Prop()
  provinciaInei: string;
  @Prop()
  provincia: string;
  @Prop()
  distrito: string;
  @Prop()
  region: string;
  @Prop()
  macroregionInei: string;
  @Prop()
  macroregionMinsa: string;
  @Prop()
  fips: string;
  @Prop()
  superficie: number;
  @Prop()
  altitud: number;
  @Prop()
  latitud: number;
  @Prop()
  longitud: number;
  @Prop()
  frontera: string;
  //
  @Prop()
  name: string;
  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
