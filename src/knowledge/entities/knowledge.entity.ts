import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { genUUID } from "src/utils";

@Schema()
export class Knowledge extends Document {
  @Prop({
    index: true,
    unique: true,
    default: genUUID,
  })
  uuid: string;

  @Prop()
  name: string;

  @Prop({ required: true, default: () => new Date()})
  createdAt: Date;
  @Prop({ required: false, default: null })
  updatedAt: Date;

}

export const KnowledgeSchema = SchemaFactory.createForClass(Knowledge);
