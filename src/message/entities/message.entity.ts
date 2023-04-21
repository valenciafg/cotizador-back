import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { genUUID } from '../../utils';

@Schema()
export class Message extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  uuid: string;

  @Prop()
  channelId: string;

  @Prop()
  userId: string;

  @Prop()
  content: string;

  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
