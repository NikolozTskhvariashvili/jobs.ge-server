import { AuthService } from './auth.service';
import { CompanySignUpDto } from './dto/CompanySignUp.dto';
import { CompanySignInDto } from './dto/Company-SignIn.dto';
import { UserSignUpDto } from './dto/User-SignUp.dto';
import { UserSignInDto } from './dto/User-SignIn.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    SignUpCompany(companySignUpDto: CompanySignUpDto, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    SignInCompany(CompanySignInDto: CompanySignInDto): Promise<{
        token: string;
    }>;
    SignUpUser(UserSignUpDto: UserSignUpDto, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    SignInUser(UserSignInDto: UserSignInDto): Promise<{
        token: string;
    }>;
    CurrentCompany(req: any): Promise<import("mongoose").Document<unknown, {}, import("../company/schemas/company.schema").Company, {}> & import("../company/schemas/company.schema").Company & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    CurrentUser(req: any): Promise<import("mongoose").Document<unknown, {}, import("../user/schemas/user.schema").User, {}> & import("../user/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
