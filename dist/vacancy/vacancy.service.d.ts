import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Model } from 'mongoose';
import { Vacancy } from './schema/vacancy.entity';
import { Company } from 'src/company/schemas/company.schema';
import { StatusChange } from 'src/company/dto/change-status.dto';
import { User } from 'src/user/schemas/user.schema';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
export declare class VacancyService {
    private VacancyModel;
    private CompanyModel;
    private UserModel;
    private awsS3Service;
    private emailSenderService;
    constructor(VacancyModel: Model<Vacancy>, CompanyModel: Model<Company>, UserModel: Model<User>, awsS3Service: AwsS3Service, emailSenderService: EmailSenderService);
    SendCv(vacancyId: any, userId: any, CV: any): Promise<{
        message: string;
    }>;
    ApproveStatus(userId: any, { id }: StatusChange): Promise<{
        message: string;
    }>;
    DeclineStatus(userId: any, { id }: StatusChange): Promise<{
        message: string;
    }>;
    create({ salary, text }: CreateVacancyDto, id: any): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: any): Promise<import("mongoose").Document<unknown, {}, Vacancy, {}> & Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: any, { salary, text }: UpdateVacancyDto): Promise<string>;
    remove(id: any): Promise<string>;
}
