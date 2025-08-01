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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcript = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const aws_s3_service_1 = require("../aws-s3/aws-s3.service");
const uuid_1 = require("uuid");
const twilo_service_1 = require("../twilo/twilo.service");
let AuthService = class AuthService {
    companyModel;
    userModel;
    jwtService;
    awsS3Service;
    twilioService;
    constructor(companyModel, userModel, jwtService, awsS3Service, twilioService) {
        this.companyModel = companyModel;
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.awsS3Service = awsS3Service;
        this.twilioService = twilioService;
    }
    async SignUpCompany({ companyName, email, password, phoneNumber, aboutUs }, file) {
        console.log(companyName, 'rame');
        const existCompany = await this.companyModel.findOne({ email });
        if (existCompany)
            throw new common_1.BadRequestException('company already exist');
        if (!file)
            throw new common_1.BadRequestException('file is required');
        const fileType = file.mimetype.split('/')[1];
        const fileId = `images/${(0, uuid_1.v4)()}.${fileType}`;
        console.log(fileId, 'fileid');
        await this.awsS3Service.UploadFile(fileId, file);
        const hashedPassword = await bcript.hash(password, 10);
        const newCompany = this.companyModel.create({
            companyName,
            email,
            password: hashedPassword,
            phoneNumber,
            aboutUs,
            profileImage: `${process.env.CLOUD_FRONT_URL}/${fileId}`,
        });
        if (phoneNumber) {
            try {
                await this.twilioService.sendSms(phoneNumber, `👋 Welcome, ${companyName}! Your company account was created successfully on Jobs.ge.`);
            }
            catch (error) {
                console.error('Failed to send SMS:', error.message);
            }
        }
        return { message: 'company account creted succsesfuly' };
    }
    async SignInCompany({ email, password }) {
        const existCompany = await this.companyModel
            .findOne({ email })
            .populate('password');
        if (!existCompany)
            throw new common_1.BadRequestException('company not found');
        const passwordEqual = await bcript.compare(password, existCompany.password);
        if (!passwordEqual)
            throw new common_1.BadRequestException('invalid credentials');
        const payload = {
            id: existCompany._id,
        };
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });
        return { token };
    }
    async SignUpUser({ email, fullName, password, phoneNumber }) {
        const existUser = await this.userModel.findOne({ email });
        if (existUser)
            throw new common_1.BadRequestException('user alreadu exist');
        const hashedPassword = await bcript.hash(password, 10);
        await this.userModel.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
        });
        if (phoneNumber) {
            try {
                await this.twilioService.sendSms(phoneNumber, `👋 Welcome, ${fullName}! Your account was created successfully on Jobs.ge.`);
            }
            catch (error) {
                console.error('Failed to send SMS:', error.message);
            }
        }
        return { message: 'user created succsesfuly' };
    }
    async SignInUser({ email, password }) {
        const existUser = await this.userModel
            .findOne({ email })
            .populate('password');
        if (!existUser)
            throw new common_1.BadRequestException('user not found');
        const passEqual = await bcript.compare(password, existUser.password);
        if (!passEqual)
            throw new common_1.BadRequestException('invalid credentials');
        const payload = {
            id: existUser._id,
        };
        const token = this.jwtService.sign(payload, { expiresIn: '1h' });
        return { token };
    }
    async currentCompany(id) {
        const company = await this.companyModel.findById(id);
        if (!company)
            throw new common_1.BadRequestException('company not found');
        return company;
    }
    async CurrentUser(id) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.BadRequestException('user not found');
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('company')),
    __param(1, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        aws_s3_service_1.AwsS3Service,
        twilo_service_1.TwilioService])
], AuthService);
//# sourceMappingURL=auth.service.js.map