import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSenderService {
  constructor(private mailerService: MailerService) {}

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
}
