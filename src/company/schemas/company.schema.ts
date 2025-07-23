import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})
export class Company {

    @Prop({
        type:String,
        required:true
    })
    companyName: string;
    

        @Prop({
        type:String,
        required:true,
        lowercase:true
    })
    email: string;

        @Prop({
        type:String,
        required:true,
        select:false
    })
    password: string;

        @Prop({
        type:Number,
        required:true
    })
    phoneNumber: number;


    @Prop({
        type:String,
        required:true
    })
    aboutUs: string
    
    @Prop({
        type:String,
        default:'company'
    })
    role:string

    @Prop({
        type:String
    })
    image: string

    @Prop({
        type: [mongoose.Types.ObjectId],
        ref:'vacancy',
        default:[]
    })
    vacancies: mongoose.Types.ObjectId[]
}


export const CompanySchema = SchemaFactory.createForClass(Company)