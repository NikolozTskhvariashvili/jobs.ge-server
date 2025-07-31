import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { StatusChange } from 'src/company/dto/change-status.dto';
export declare class VacancyController {
    private readonly vacancyService;
    constructor(vacancyService: VacancyService);
    ApproveStatus(req: any, StatusChange: StatusChange): Promise<{
        message: string;
    }>;
    DeclineStatus(req: any, StatusChange: StatusChange): Promise<{
        message: string;
    }>;
    create(createVacancyDto: CreateVacancyDto, req: any): Promise<{
        message: string;
        data: import("mongoose").Document<unknown, {}, import("./schema/vacancy.entity").Vacancy, {}> & import("./schema/vacancy.entity").Vacancy & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    SendCv(req: any, vacancyId: any, file: Express.Multer.File): Promise<{
        message: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/vacancy.entity").Vacancy, {}> & import("./schema/vacancy.entity").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/vacancy.entity").Vacancy, {}> & import("./schema/vacancy.entity").Vacancy & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: any, updateVacancyDto: UpdateVacancyDto): Promise<string>;
    remove(id: any): Promise<string>;
}
