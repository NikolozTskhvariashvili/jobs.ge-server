import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Vacancy {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'company',
  })
  company: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  text: string;

  @Prop({
    type: Number,
    required: true,
  })
  salary: number;

  @Prop({
    type: String,
    default: 'pending',
  })
  status: string;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref:'user',
    default:[]
  })
  applicants :mongoose.Types.ObjectId[]
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
