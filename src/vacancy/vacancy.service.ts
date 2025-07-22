import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Vacancy } from './schema/vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(@InjectModel('vacancy') private VacancyModel: Model<Vacancy>) {}

  async create({ salary, text }: CreateVacancyDto, id) {
    const newVacancy = await this.VacancyModel.create({
      company: id,
      text,
      salary,
    });

    return { message: 'vacancy creared succsesfully', data: newVacancy };
  }

  async findAll() {
    const vacancies = await this.VacancyModel.find().populate({
      path: 'company',
      select: 'companyName',
    });
    return vacancies;
  }

  async findOne(id) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const vacancy = await this.VacancyModel.findById(id);
    if (!vacancy) throw new BadRequestException('vacancy no tdound');
    return vacancy;
  }

  async update(id, { salary, text }: UpdateVacancyDto) {
    if (!isValidObjectId(id)) throw new BadGatewayException('invalid id');
    const vacancy = await this.VacancyModel.findById(id);
    if (!vacancy) throw new BadGatewayException('vacancy not found');

    await this.VacancyModel.findByIdAndUpdate(id, {
      salary,
      text,
    });
    return 'vacancy updated succsesfully';
  }

  async remove(id) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const vacancy = await this.VacancyModel.findById(id);
    if (!vacancy) throw new BadRequestException('cvacancy not found');

    await this.VacancyModel.findByIdAndDelete(id);
    return ' vacancy delted succsesfully';
  }
}
