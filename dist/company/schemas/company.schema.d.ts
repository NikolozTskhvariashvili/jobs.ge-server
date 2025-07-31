import mongoose from "mongoose";
export declare class Company {
    companyName: string;
    email: string;
    password: string;
    phoneNumber: number;
    aboutUs: string;
    role: string;
    profileImage: string;
    vacancies: mongoose.Types.ObjectId[];
}
export declare const CompanySchema: mongoose.Schema<Company, mongoose.Model<Company, any, any, any, mongoose.Document<unknown, any, Company, any> & Company & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Company, mongoose.Document<unknown, {}, mongoose.FlatRecord<Company>, {}> & mongoose.FlatRecord<Company> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
