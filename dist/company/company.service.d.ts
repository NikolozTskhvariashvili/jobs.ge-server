import { UpdateCompanyDto } from './dto/update-company.dto';
import { Model } from 'mongoose';
import { Company } from './schemas/company.schema';
import { User } from 'src/user/schemas/user.schema';
export declare class CompanyService {
    private CompanyModel;
    private UserModel;
    constructor(CompanyModel: Model<Company>, UserModel: Model<User>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: any): Promise<import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: any, { aboutUs, companyName, email, password, phoneNumber }: UpdateCompanyDto): Promise<{
        message: string;
    }>;
    remove(id: any): Promise<{
        message: string;
    }>;
}
