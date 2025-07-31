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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = class UserService {
    UserModel;
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async findAll() {
        const users = await this.UserModel.find();
        return users;
    }
    async findOne(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException('invalid id');
        const user = await this.UserModel.findById(id);
        if (!user)
            throw new common_1.BadRequestException('user not found');
        return user;
    }
    async update(id, { email, fullName, password, phoneNumber }) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException('invalid id');
        const user = await this.UserModel.findById(id);
        if (!user)
            throw new common_1.BadRequestException('user not found');
        await this.UserModel.findByIdAndUpdate(id, {
            email, fullName, password, phoneNumber
        });
        return { message: "user updated succsesfully" };
    }
    async remove(id) {
        if (!(0, mongoose_2.isValidObjectId)(id))
            throw new common_1.BadRequestException('invalid id');
        const user = await this.UserModel.findById(id);
        if (!user)
            throw new common_1.BadRequestException('user not found');
        await this.UserModel.findByIdAndDelete(id);
        return { message: "user deleted succsesfully" };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map