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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSenderService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
let EmailSenderService = class EmailSenderService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async SendTextToSomeOne(to, subject, content) {
        const options = {
            to,
            from: 'New Applicant <nikusha.tskhvaro@gmail.com>',
            subject,
            html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 24px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 6px;
          }
          .footer {
            margin-top: 24px;
            font-size: 14px;
            color: #888;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Hello,</p>

          <p>You have received a new CV submission for your vacancy.</p>

          <p>
            <strong>Candidate Name:</strong> ${content}
          </p>

          <p>
            The candidate is interested in your job listing and has submitted their CV for your consideration.
          </p>

          <p>
            Please review the attached file for their resume. If you wish to contact the applicant, you can reach out directly.
          </p>

          <p class="footer">
            Best regards,<br />
            Your Company Recruitment System
          </p>
        </div>
      </body>
    </html>
  `,
        };
        await this.mailerService.sendMail(options);
    }
};
exports.EmailSenderService = EmailSenderService;
exports.EmailSenderService = EmailSenderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailSenderService);
//# sourceMappingURL=email-sender.service.js.map