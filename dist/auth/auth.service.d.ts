import { CompanySignUpDto } from './dto/CompanySignUp.dto';
import { Company } from 'src/company/schemas/company.schema';
import { Model } from 'mongoose';
import { CompanySignInDto } from './dto/Company-SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { UserSignUpDto } from './dto/User-SignUp.dto';
import { UserSignInDto } from './dto/User-SignIn.dto';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
export declare class AuthService {
    private companyModel;
    private userModel;
    private jwtService;
    private awsS3Service;
    constructor(companyModel: Model<Company>, userModel: Model<User>, jwtService: JwtService, awsS3Service: AwsS3Service);
    SignUpCompany({ companyName, email, password, phoneNumber, aboutUs }: CompanySignUpDto, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    SignInCompany({ email, password }: CompanySignInDto): Promise<{
        token: string;
    }>;
    SignUpUser({ email, fullName, password, phoneNumber }: UserSignUpDto): Promise<{
        message: string;
    }>;
    SignInUser({ email, password }: UserSignInDto): Promise<{
        token: string;
    }>;
    currentCompany(id: any): Promise<import("mongoose").Document<unknown, {}, Company, {}> & Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    CurrentUser(id: any): Promise<import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
