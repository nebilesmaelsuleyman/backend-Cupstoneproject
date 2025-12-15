import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  clerkUserId: string

  @Prop()
  email: string

  @Prop({ default: 'ADMIN' })
  role: string

  @Prop({ default: true })
  active: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
