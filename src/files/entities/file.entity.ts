import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { genUUID } from 'src/utils';

@Schema()
export class File extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  @ApiProperty()
  uuid: string;
  @Prop()
  @ApiProperty()
  bucket: string;
  @Prop()
  @ApiProperty()
  key: string;
  @Prop()
  @ApiProperty()
  mimeType: string;
  @Prop()
  @ApiProperty()
  type: string;
  @Prop()
  @ApiProperty()
  userId: string;
  @Prop()
  @ApiProperty()
  createdBy: string;
  @Prop()
  @ApiProperty()
  updatedBy: string;
  @Prop({ required: true, default: () => new Date() })
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
