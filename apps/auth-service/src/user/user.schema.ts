import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    clerkUserId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['ADMIN', 'TEACHER', 'STUDENT','PARENT'],
      required: true,
    },
    schoolId: { type: String },
    firstName: String,
    lastName: String,
    status: {
      type: String,
      enum: ['ACTIVE', 'SUSPENDED'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true },
);
