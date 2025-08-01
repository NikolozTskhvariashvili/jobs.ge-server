import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { TwiloModule } from './twilo/twilo.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    AuthModule,
    UserModule,
    CompanyModule,
    VacancyModule,
    AwsS3Module,
    TwiloModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
