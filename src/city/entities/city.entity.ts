import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import { genUUID } from "src/utils";

@Schema()
export class City extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  @ApiProperty()
  uuid: string;
  @Prop({
    index: true,
    unique: true
  })
  isoCode: string;
  @Prop()
  name: string;
  @Prop({ required: true, default: () => new Date()})
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;

}

export const CitySchema = SchemaFactory.createForClass(City);
