import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Company } from './schemas/company.schema';
import { User } from 'src/user/schemas/user.schema';
import { StatusChange } from './dto/change-status.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('company') private CompanyModel: Model<Company>,
    @InjectModel('user') private UserModel: Model<User>,
  ) {}


  async findAll() {
    const companies = await this.CompanyModel.find().populate('vacancies')
    return companies;
  }

  async findOne(id) {
    if (!isValidObjectId(id)) throw new BadGatewayException('invalid id');
    const company = await this.CompanyModel.findById(id).populate('vacancies')
    if (!company) throw new BadGatewayException('company not found');
    return company;
  }

  async update(
    id,
    { aboutUs, companyName, email, password, phoneNumber }: UpdateCompanyDto,
  ) {
    if (!isValidObjectId(id)) throw new BadGatewayException('invalid id');
    const company = await this.CompanyModel.findById(id);
    if (!company) throw new BadGatewayException('company not found');

    await this.CompanyModel.findByIdAndUpdate(id, {
      aboutUs,
      companyName,
      email,
      password,
      phoneNumber,
    });
    return { message: 'company updated succsesfully' };
  }

  async remove(id) {
    if (!isValidObjectId(id)) throw new BadGatewayException('invalid id');
    const company = await this.CompanyModel.findById(id);
    if (!company) throw new BadGatewayException('company not found');

    await this.CompanyModel.findByIdAndDelete(id);
    return { message: 'company deleted succsesfully' };
  }
}
