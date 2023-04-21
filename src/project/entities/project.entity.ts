import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { genUUID } from '../../utils';

@Schema()
export class Project extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  uuid: string;

  @Prop()
  name: string;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
