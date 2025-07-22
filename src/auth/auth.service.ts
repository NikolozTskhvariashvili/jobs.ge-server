import { BadRequestException, Injectable } from '@nestjs/common';
import { CompanySignUpDto } from './dto/CompanySignUp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/company/schemas/company.schema';
import { Model } from 'mongoose';
import * as bcript from 'bcrypt';
import { CompanySignInDto } from './dto/Company-SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { UserSignUpDto } from './dto/User-SignUp.dto';
import { UserSignInDto } from './dto/User-SignIn.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('company') private companyModel: Model<Company>,
    @InjectModel('user') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async SignUpCompany({
    companyName,
    email,
    password,
    phoneNumber,
    aboutUs,
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
      aboutUs,
    });
    return { message: 'company account creted succsesfuly' };
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

  async SignUpUser({ email, fullName, password, phoneNumber }: UserSignUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) throw new BadRequestException('user alreadu exist');

    const hashedPassword = await bcript.hash(password, 10);
    await this.userModel.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    return { message: 'user created succsesfuly' };
  }

  async SignInUser({ email, password }: UserSignInDto) {
    const existUser = await this.userModel
      .findOne({ email })
      .populate('password');
    if (!existUser) throw new BadRequestException('user not found');

    const passEqual = await bcript.compare(password, existUser.password);
    if (!passEqual) throw new BadRequestException('invalid credentials');

    const payload = {
      id: existUser._id,
    };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    return { token };
  }

  async currentCompany(id) {
    const company = await this.companyModel.findById(id);
    if (!company) throw new BadRequestException('company not found');
    return company;
  }

  async CurrentUser(id) {
    const user = await this.userModel.findById(id);
    if (!user) throw new BadRequestException('user not found');

    return user;
  }
}
