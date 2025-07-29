import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ type: String, unique: true, lowercase: true, required: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  industry: string;

  @Prop({ type: Boolean, default: false })
  isApproved: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'job', default: [] })
  jobs: mongoose.Types.ObjectId[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
