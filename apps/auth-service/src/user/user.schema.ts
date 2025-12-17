import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  clerkUserId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ 
    enum: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
    default: 'STUDENT' 
  })
  role: string;

  @Prop()
  schoolId: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ 
    enum: ['ACTIVE', 'SUSPENDED'], 
    default: 'ACTIVE' 
  })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);