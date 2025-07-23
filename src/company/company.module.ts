import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from './schemas/company.schema';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
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
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
