import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VacancySchema } from './schema/vacancy.entity';
import { CompanySchema } from 'src/company/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: VacancySchema,
        name: 'vacancy',
      },
    ]),
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
