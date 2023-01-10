import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  uuid: string;
  @Prop({
    unique: true,
    index: true,
  })
  @ApiProperty()
  email: string;
  @Prop()
  @ApiProperty()
  password: string;
  @Prop()
  @ApiProperty()
  name: string;
  @Prop()
  @ApiProperty()
  lastName: string;
  @Prop()
  @ApiProperty()
  businessName: string;
  @Prop()
  @ApiProperty()
  comercialName: string;
  @Prop({
    default: true,
  })
  @ApiProperty()
  status: boolean;
  @Prop({
    default: 1,
  })
  @ApiProperty()
  registerStep: number;
  @Prop({
    enum: Object.values(USER_TYPE),
  })
  @ApiProperty()
  userType: number;
  @Prop({
    index: true,
  })
  @ApiProperty()
  dni: string;
  @Prop({
    index: true,
  })
  @ApiProperty()
  ruc: string;
  @Prop()
  @ApiProperty()
  description: string;
  @Prop()
  @ApiProperty()
  cityId: string;
  @Prop()
  @ApiProperty()
  address: string;
  @Prop()
  latitude: number;
  @Prop()
  @ApiProperty()
  longitude: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
