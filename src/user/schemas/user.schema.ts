import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class User {

    @Prop({
        type:String,
        required:true
    })
    fullName:string

        @Prop({
        type:String,
        required:true,
        lowercase:true
    })
    email:string

        @Prop({
        type:String,
        required:true,
        select:false
    })
    password:string

        @Prop({
        type:Number,
        required:true
    })
    phoneNumber:number

}


export const UserSchema = SchemaFactory.createForClass(User)