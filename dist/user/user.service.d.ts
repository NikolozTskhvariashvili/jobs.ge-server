import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UserService {
    private UserModel;
    constructor(UserModel: Model<User>);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: any): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: any, { email, fullName, password, phoneNumber }: UpdateUserDto): Promise<{
        message: string;
    }>;
    remove(id: any): Promise<{
        message: string;
    }>;
}
