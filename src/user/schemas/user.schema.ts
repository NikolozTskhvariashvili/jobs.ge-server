import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    default: 'user',
  })
  role: string;

  @Prop({
    type: String,
    required: true,
  })
  profileImage: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'vacancy',
    default: [],
  })
  appliedJobs: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
