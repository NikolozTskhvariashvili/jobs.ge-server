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
import { Company } from 'src/company/schemas/company.schema';
import { StatusChange } from 'src/company/dto/change-status.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class VacancyService {
  constructor(
    @InjectModel('vacancy') private VacancyModel: Model<Vacancy>,
    @InjectModel('company') private CompanyModel: Model<Company>,
    @InjectModel('user') private UserModel: Model<User>,
  ) {}

  async ApproveStatus(userId, { id }: StatusChange) {
      const user = await this.UserModel.findById(userId);
      if (user?.role !== 'admin')
        throw new BadGatewayException('user cant change status');
  
      await this.CompanyModel.findByIdAndUpdate(id, {
        status: 'approved',
      });
      return {message:'status approved'}
    }
  
      async DeclineStatus(userId, { id }: StatusChange) {
      const user = await this.UserModel.findById(userId);
      if (user?.role !== 'admin')
        throw new BadGatewayException('user cant change status');
  
      await this.CompanyModel.findByIdAndUpdate(id, {
        status: 'declined',
      });
      return {message:'status declined'}
    }

  async create({ salary, text }: CreateVacancyDto, id) {
    const company = await this.CompanyModel.findById(id);
    if (!company || company.role !== 'company') {
      throw new BadRequestException('only companies can add vacancies');
    }

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
