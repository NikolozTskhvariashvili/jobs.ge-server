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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CompanyService = class CompanyService {
    CompanyModel;
    UserModel;
    constructor(CompanyModel, UserModel) {
        this.CompanyModel = CompanyModel;
        this.UserModel = UserModel;
    }
    async findAll() {
        const companies = await this.CompanyModel.find().populate({
            path: 'vacancies',
            populate: {
                path: 'applicants.userId',
                select: 'fullName email phoneNumber role',
            },
        });
        return companies;
    }
    async findOne(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadGatewayException('invalid id');
        const company = await this.CompanyModel.findById(id).populate({
            path: 'vacancies',
            populate: {
                path: 'applicants.userId',
                select: 'fullName email phoneNumber role',
            },
        });
        if (!company)
            throw new common_1.BadGatewayException('company not found');
        return company;
    }
    async update(id, { aboutUs, companyName, email, password, phoneNumber }) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadGatewayException('invalid id');
        const company = await this.CompanyModel.findById(id);
        if (!company)
            throw new common_1.BadGatewayException('company not found');
        await this.CompanyModel.findByIdAndUpdate(id, {
            aboutUs,
            companyName,
            email,
            password,
            phoneNumber,
        });
        return { message: 'company updated succsesfully' };
    }
    async remove(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadGatewayException('invalid id');
        const company = await this.CompanyModel.findById(id);
        if (!company)
            throw new common_1.BadGatewayException('company not found');
        await this.CompanyModel.findByIdAndDelete(id);
        return { message: 'company deleted succsesfully' };
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('company')),
    __param(1, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CompanyService);
//# sourceMappingURL=company.service.js.map