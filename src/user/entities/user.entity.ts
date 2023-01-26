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
  commercialName: string;
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
  cityId: number;
  @Prop()
  @ApiProperty()
  address: string;
  @Prop()
  latitude: number;
  @Prop()
  @ApiProperty()
  longitude: number;
  @Prop()
  @ApiProperty()
  loginAttempts: number;
  @Prop()
  @ApiProperty()
  profession: string;
  @Prop()
  @ApiProperty()
  specialty: string;
  @Prop()
  @ApiProperty()
  knowledge: string[];
  @Prop()
  @ApiProperty()
  currentCompanies: string[];
  @Prop()
  @ApiProperty()
  workedCompanies: string[];
  @Prop()
  @ApiProperty()
  workedProjects: string[];
  @Prop()
  @ApiProperty()
  services: string[];
  @Prop()
  @ApiProperty()
  headings: string[];
  @Prop()
  @ApiProperty()
  phone: string;
  @Prop()
  @ApiProperty()
  phoneCode: string;
  @Prop()
  @ApiProperty()
  optionalPhone: string;
  @Prop()
  @ApiProperty()
  optionalPhoneCode: string;
  @Prop()
  @ApiProperty()
  websiteUrl: string;
  @Prop()
  @ApiProperty()
  facebookUrl: string;
  @Prop()
  @ApiProperty()
  instagramUrl: string;
  @Prop()
  @ApiProperty()
  twitterUrl: string;
  @Prop()
  @ApiProperty()
  tiktokUrl: string;
  @Prop()
  @ApiProperty()
  extraInformation: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
