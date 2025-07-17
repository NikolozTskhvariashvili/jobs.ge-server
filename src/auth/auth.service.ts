import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanySignUpDto } from './dto/CompanySignUp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/company/schemas/company.schema';
import { Model } from 'mongoose';
import * as bcript from 'bcrypt';
import { CompanySignInDto } from './dto/Company-SignIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('company') private companyModel: Model<Company>,
    private jwtService: JwtService,
  ) {}

  async SignUpCompany({
    companyName,
    email,
    password,
    phoneNumber,
  }: CompanySignUpDto) {
    console.log(companyName, 'rame');
    const existCompany = await this.companyModel.findOne({ email });
    if (existCompany) throw new BadRequestException('company already exist');

    const hashedPassword = await bcript.hash(password, 10);
    const newCompany = this.companyModel.create({
      companyName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return { message: 'company account creted succsesfuly', data: newCompany };
  }

  async SignInCompany({ email, password }: CompanySignInDto) {
    const existCompany = await this.companyModel
      .findOne({ email })
      .populate('password');
    if (!existCompany) throw new BadRequestException('company not found');

    const passwordEqual = await bcript.compare(password, existCompany.password);
    if (!passwordEqual) throw new BadRequestException('invalid credentials');

    const payload = {
      id: existCompany._id,
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { token };
  }

  async currentCompany(id){
    const company = await this.companyModel.findById(id)
    return company
  }
}
