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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const CompanySignUp_dto_1 = require("./dto/CompanySignUp.dto");
const Company_SignIn_dto_1 = require("./dto/Company-SignIn.dto");
const isAuth_guard_1 = require("./guard/isAuth.guard");
const User_SignUp_dto_1 = require("./dto/User-SignUp.dto");
const User_SignIn_dto_1 = require("./dto/User-SignIn.dto");
const platform_express_1 = require("@nestjs/platform-express");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    SignUpCompany(companySignUpDto, file) {
        return this.authService.SignUpCompany(companySignUpDto, file);
    }
    SignInCompany(CompanySignInDto) {
        return this.authService.SignInCompany(CompanySignInDto);
    }
    SignUpUser(UserSignUpDto, file) {
        return this.authService.SignUpUser(UserSignUpDto, file);
    }
    SignInUser(UserSignInDto) {
        return this.authService.SignInUser(UserSignInDto);
    }
    CurrentCompany(req) {
        return this.authService.currentCompany(req.customerId);
    }
    CurrentUser(req) {
        return this.authService.CurrentUser(req.customerId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('company/sign-up'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CompanySignUp_dto_1.CompanySignUpDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "SignUpCompany", null);
__decorate([
    (0, common_1.Post)('company/sign-in'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Company_SignIn_dto_1.CompanySignInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "SignInCompany", null);
__decorate([
    (0, common_1.Post)('user/sign-up'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_SignUp_dto_1.UserSignUpDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "SignUpUser", null);
__decorate([
    (0, common_1.Post)('user/sign-in'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([])),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_SignIn_dto_1.UserSignInDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "SignInUser", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuth),
    (0, common_1.Get)('current-company'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "CurrentCompany", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuth),
    (0, common_1.Get)('current-user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "CurrentUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map