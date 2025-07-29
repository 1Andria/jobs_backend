import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type UserRole = 'user' | 'admin';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, unique: true, lowercase: true, required: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ type: String, required: true, select: false })
  userName: string;

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'job', default: [] })
  appliedJobs: mongoose.Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);
