import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true, index: true })
  location: string;

  @Prop({ type: String, required: true, index: true })
  category: string;

  @Prop({ type: Boolean, default: false })
  isAccepted: boolean;

  @Prop({ type: Number, required: true, index: true })
  salary: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
    required: true,
  })
  jobOwnerCompany: mongoose.Types.ObjectId;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] })
  applicants: mongoose.Types.ObjectId[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
