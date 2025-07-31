import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VacancySchema } from './schema/vacancy.entity';
import { CompanySchema } from 'src/company/schemas/company.schema';
import { UserSchema } from 'src/user/schemas/user.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    AwsS3Module,
    EmailSenderModule,
        MailerModule.forRoot({
          transport:{
            host:process.env.EMAIL_HOST,
            port:465,
            auth:{
              user:process.env.EMAIL_USER,
              pass:process.env.EMAIL_PASS
            }
          }
        }),
    MongooseModule.forFeature([
      {
        schema: VacancySchema,
        name: 'vacancy',
      },
      {
        schema: CompanySchema,
        name: 'company',
      },
      {
        schema: UserSchema,
        name: 'user',
      },
    ]),
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
