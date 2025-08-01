"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacancyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
const aws_s3_service_1 = require("../aws-s3/aws-s3.service");
const email_sender_service_1 = require("../email-sender/email-sender.service");
let VacancyService = class VacancyService {
    VacancyModel;
    CompanyModel;
    UserModel;
    awsS3Service;
    emailSenderService;
    constructor(VacancyModel, CompanyModel, UserModel, awsS3Service, emailSenderService) {
        this.VacancyModel = VacancyModel;
        this.CompanyModel = CompanyModel;
        this.UserModel = UserModel;
        this.awsS3Service = awsS3Service;
        this.emailSenderService = emailSenderService;
    }
    async SendCv(vacancyId, userId, CV) {
        if (!(0, mongoose_2.isValidObjectId)(vacancyId))
            throw new common_1.BadRequestException('vacancyId not found');
        const vacancy = await this.VacancyModel.findById(vacancyId);
        if (!vacancy)
            throw new common_1.BadRequestException('vacancy not found');
        if (!CV)
            throw new common_1.BadRequestException('cv is required');
        const fileType = CV.mimetype.split('/')[1];
        const fileId = `files/${(0, uuid_1.v4)()}.${fileType}`;
        console.log(fileId, 'fileIddddddddd');
        await this.awsS3Service.UploadFile(fileId, CV);
        await this.VacancyModel.findByIdAndUpdate(vacancyId, {
            $push: {
                applicants: { userId, CV: `${process.env.CLOUD_FRONT_URL}/${fileId}` },
            },
        });
        const user = await this.UserModel.findById(userId);
        const subject = 'New User Apllied Your Vacancy';
        const content = user?.fullName;
        const companyEmail = vacancy.company?.email;
        await this.emailSenderService.SendTextToSomeOne('jdjjnxxj581@gmail.com', subject, content);
        console.log('gaegzavnaaaaaaaaaaaaaaaa');
        return { message: 'added succsesfully' };
    }
    async ApproveStatus(userId, { id }) {
        const user = await this.UserModel.findById(userId);
        if (user?.role !== 'admin')
            throw new common_1.BadRequestException('user cant change status');
        await this.VacancyModel.findByIdAndUpdate(id, {
            status: 'approved',
        });
        return { message: 'status approved' };
    }
    async DeclineStatus(userId, { id }) {
        const user = await this.UserModel.findById(userId);
        if (user?.role !== 'admin')
            throw new common_1.BadGatewayException('user cant change status');
        await this.CompanyModel.findByIdAndUpdate(id, {
            status: 'declined',
        });
        return { message: 'status declined' };
    }
    async create({ salary, text, level, position, searchKey, skill }, id) {
        const company = await this.CompanyModel.findById(id);
        if (!company || company.role !== 'company') {
            throw new common_1.BadRequestException('only companies can add vacancies');
        }
        const newVacancy = await this.VacancyModel.create({
            company: id,
            text,
            salary,
            level,
            position,
            searchKey,
            skill,
        });
        await this.CompanyModel.findByIdAndUpdate(id, {
            $push: { vacancies: newVacancy._id },
        });
        return { message: 'vacancy creared succsesfully', data: newVacancy };
    }
    async findAll(filters) {
        const query = {
            status: 'approved',
        };
        if (filters.jobTitle) {
            query.jobTitle = { $regex: filters.jobTitle, $options: 'i' };
        }
        if (filters.experience) {
            query.level = filters.experience;
        }
        if (filters.salary) {
            query.salary = { $gte: Number(filters.salary) };
        }
        const vacancies = await this.VacancyModel.find(query)
            .populate({
            path: 'company',
            select: 'companyName',
        })
            .populate({
            path: 'applicants.userId',
            select: '',
        });
        return vacancies;
    }
    async findOne(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException('invalid id');
        const vacancy = await this.VacancyModel.findById(id)
            .populate('company')
            .populate({
            path: 'applicants.userId',
            select: '',
        });
        if (!vacancy)
            throw new common_1.BadRequestException('vacancy no tdound');
        return vacancy;
    }
    async update(id, { salary, text, level, position, searchKey, skill }) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadGatewayException('invalid id');
        const vacancy = await this.VacancyModel.findById(id);
        if (!vacancy)
            throw new common_1.BadGatewayException('vacancy not found');
        await this.VacancyModel.findByIdAndUpdate(id, {
            text,
            salary,
            level,
            position,
            searchKey,
            skill,
        });
        return 'vacancy updated succsesfully';
    }
    async remove(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException('invalid id');
        const vacancy = await this.VacancyModel.findById(id);
        if (!vacancy)
            throw new common_1.BadRequestException('cvacancy not found');
        await this.VacancyModel.findByIdAndDelete(id);
        return ' vacancy delted succsesfully';
    }
};
exports.VacancyService = VacancyService;
exports.VacancyService = VacancyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('vacancy')),
    __param(1, (0, mongoose_1.InjectModel)('company')),
    __param(2, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        aws_s3_service_1.AwsS3Service,
        email_sender_service_1.EmailSenderService])
], VacancyService);
//# sourceMappingURL=vacancy.service.js.map