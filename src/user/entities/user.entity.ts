import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { genUUID } from '../../utils';
import { USER_TYPE } from '../../constants';

@Schema()
export class User extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  uuid: string;
  @Prop({
    unique: true,
    index: true,
  })
  email: string;
  @Prop()
  password: string;
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  businessName: string;
  @Prop()
  comercialName: string;
  @Prop({
    default: true,
  })
  status: boolean;
  @Prop({
    default: 1,
  })
  registerStep: number;
  @Prop({
    required: true,
    enum: Object.values(USER_TYPE),
  })
  userType: number;
  @Prop({
    unique: true,
    index: true,
  })
  dni: string;
  @Prop({
    unique: true,
    index: true,
  })
  ruc: string;
  @Prop()
  description: string;
  @Prop()
  cityId: string;
  @Prop()
  address: string;
  @Prop()
  latitude: number;
  @Prop()
  longitude: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
