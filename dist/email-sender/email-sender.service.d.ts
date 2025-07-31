import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailSenderService {
    private mailerService;
    constructor(mailerService: MailerService);
    SendTextToSomeOne(to: any, subject: any, content: any): Promise<void>;
}
