"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacancyModule = void 0;
const common_1 = require("@nestjs/common");
const vacancy_service_1 = require("./vacancy.service");
const vacancy_controller_1 = require("./vacancy.controller");
const mongoose_1 = require("@nestjs/mongoose");
const vacancy_entity_1 = require("./schema/vacancy.entity");
const company_schema_1 = require("../company/schemas/company.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const aws_s3_module_1 = require("../aws-s3/aws-s3.module");
const email_sender_module_1 = require("../email-sender/email-sender.module");
const mailer_1 = require("@nestjs-modules/mailer");
let VacancyModule = class VacancyModule {
};
exports.VacancyModule = VacancyModule;
exports.VacancyModule = VacancyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            aws_s3_module_1.AwsS3Module,
            email_sender_module_1.EmailSenderModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: 465,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                }
            }),
            mongoose_1.MongooseModule.forFeature([
                {
                    schema: vacancy_entity_1.VacancySchema,
                    name: 'vacancy',
                },
                {
                    schema: company_schema_1.CompanySchema,
                    name: 'company',
                },
                {
                    schema: user_schema_1.UserSchema,
                    name: 'user',
                },
            ]),
        ],
        controllers: [vacancy_controller_1.VacancyController],
        providers: [vacancy_service_1.VacancyService],
    })
], VacancyModule);
//# sourceMappingURL=vacancy.module.js.map