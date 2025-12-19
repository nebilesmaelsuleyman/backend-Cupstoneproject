import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class School extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  schoolCode: string

  @Prop({ required: true })
  createdBy: string // clerkUserId (admin)

  @Prop({ default: true })
  active: boolean
}
export const SchoolSchema = SchemaFactory.createForClass(School);