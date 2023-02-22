import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";
import { genUUID } from "src/utils";

@Schema()
export class Post extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  @ApiProperty()
  uuid: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  content: string;
  @Prop({ required: true })
  postType: string;
  @Prop()
  mainImageUrl: string;
  @Prop()
  createdBy: string;
  @Prop()
  updatedBy: string;

  @Prop({ required: true, default: () => new Date()})
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;

}

export const PostSchema = SchemaFactory.createForClass(Post);
