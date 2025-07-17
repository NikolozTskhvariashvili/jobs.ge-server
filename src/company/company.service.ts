import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './schemas/company.schema';

@Injectable()
export class CompanyService {

  constructor(
    @InjectModel('company') private CompanyModel:Model<Company>
  ){}

  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  async findAll() {
    const companies = await this.CompanyModel.find()
    return companies
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
