import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { genUUID } from 'src/utils';
import { ChannelStatus } from '../interface';

@Schema()
export class Channel extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  createdBy: string;

  @Prop()
  users: string[];

  @Prop({ default: 'active' })
  status: ChannelStatus;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
