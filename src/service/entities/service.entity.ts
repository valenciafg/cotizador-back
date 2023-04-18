import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { genUUID } from 'src/utils';

@Schema()
export class Service extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  uuid: string;

  @Prop()
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
