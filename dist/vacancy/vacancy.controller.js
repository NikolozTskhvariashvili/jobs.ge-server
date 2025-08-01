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
exports.VacancyController = void 0;
const common_1 = require("@nestjs/common");
const vacancy_service_1 = require("./vacancy.service");
const create_vacancy_dto_1 = require("./dto/create-vacancy.dto");
const update_vacancy_dto_1 = require("./dto/update-vacancy.dto");
const isAuth_guard_1 = require("../auth/guard/isAuth.guard");
const change_status_dto_1 = require("../company/dto/change-status.dto");
const platform_express_1 = require("@nestjs/platform-express");
let VacancyController = class VacancyController {
    vacancyService;
    constructor(vacancyService) {
        this.vacancyService = vacancyService;
    }
    ApproveStatus(req, StatusChange) {
        return this.vacancyService.ApproveStatus(req.customerId, StatusChange);
    }
    DeclineStatus(req, StatusChange) {
        return this.vacancyService.DeclineStatus(req.customerId, StatusChange);
    }
    create(createVacancyDto, req) {
        return this.vacancyService.create(createVacancyDto, req.customerId);
    }
    SendCv(req, vacancyId, file) {
        return this.vacancyService.SendCv(vacancyId, req.customerId, file);
    }
    findAll(filters) {
        return this.vacancyService.findAll(filters);
    }
    findOne(id) {
        return this.vacancyService.findOne(id);
    }
    update(id, updateVacancyDto) {
        return this.vacancyService.update(id, updateVacancyDto);
    }
    remove(id) {
        return this.vacancyService.remove(id);
    }
};
exports.VacancyController = VacancyController;
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuth),
    (0, common_1.Put)('Status-approve'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_status_dto_1.StatusChange]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "ApproveStatus", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuth),
    (0, common_1.Put)('Status-decline'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_status_dto_1.StatusChange]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "DeclineStatus", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuth),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vacancy_dto_1.CreateVacancyDto, Object]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(isAuth_guard_1.IsAuth),
    (0, common_1.Put)('send-cv/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "SendCv", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_vacancy_dto_1.UpdateVacancyDto]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VacancyController.prototype, "remove", null);
exports.VacancyController = VacancyController = __decorate([
    (0, common_1.Controller)('vacancy'),
    __metadata("design:paramtypes", [vacancy_service_1.VacancyService])
], VacancyController);
//# sourceMappingURL=vacancy.controller.js.map