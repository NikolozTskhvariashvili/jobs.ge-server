import mongoose from 'mongoose';
export declare class Vacancy {
    company: mongoose.Schema.Types.ObjectId;
    text: string;
    salary: number;
    status: string;
    level: string;
    position: string;
    searchKey: string[];
    skill: string[];
    applicants: mongoose.Types.ObjectId[];
}
export declare const VacancySchema: mongoose.Schema<Vacancy, mongoose.Model<Vacancy, any, any, any, mongoose.Document<unknown, any, Vacancy, any> & Vacancy & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Vacancy, mongoose.Document<unknown, {}, mongoose.FlatRecord<Vacancy>, {}> & mongoose.FlatRecord<Vacancy> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
