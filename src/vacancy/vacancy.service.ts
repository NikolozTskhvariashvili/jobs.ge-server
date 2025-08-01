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
import { v4 as uuidv4 } from 'uuid';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { EmailSenderService } from 'src/email-sender/email-sender.service';

@Injectable()
export class VacancyService {
  constructor(
    @InjectModel('vacancy') private VacancyModel: Model<Vacancy>,
    @InjectModel('company') private CompanyModel: Model<Company>,
    @InjectModel('user') private UserModel: Model<User>,
    private awsS3Service:AwsS3Service,
    private emailSenderService:EmailSenderService
  ) {}

  async SendCv(vacancyId, userId, CV) {
    if (!isValidObjectId(vacancyId))
      throw new BadRequestException('vacancyId not found');
    const vacancy = await this.VacancyModel.findById(vacancyId);
    if (!vacancy) throw new BadRequestException('vacancy not found');
    if (!CV) throw new BadRequestException('cv is required');
    const fileType = CV.mimetype.split('/')[1];
    const fileId = `files/${uuidv4()}.${fileType}`;
    console.log(fileId, 'fileIddddddddd')
    await this.awsS3Service.UploadFile(fileId, CV);

    await this.VacancyModel.findByIdAndUpdate(vacancyId, {
      $push: { applicants: { userId, CV: `${process.env.CLOUD_FRONT_URL}/${fileId}` } },
    });

    const user = await this.UserModel.findById(userId)
    const subject = 'New User Apllied Your Vacancy'
    const content = user?.fullName
      const companyEmail = (vacancy.company as any)?.email;
        await this.emailSenderService.SendTextToSomeOne('jdjjnxxj581@gmail.com', subject, content);
        console.log('gaegzavnaaaaaaaaaaaaaaaa')
    return {message:'added succsesfully'}
  }

  async ApproveStatus(userId, { id }: StatusChange) {
    const user = await this.UserModel.findById(userId);
    if (user?.role !== 'admin')
      throw new BadRequestException('user cant change status');

    await this.VacancyModel.findByIdAndUpdate(id, {
      status: 'approved',
    });
    return { message: 'status approved' };
  }

  async DeclineStatus(userId, { id }: StatusChange) {
    const user = await this.UserModel.findById(userId);
    if (user?.role !== 'admin')
      throw new BadGatewayException('user cant change status');

    await this.CompanyModel.findByIdAndUpdate(id, {
      status: 'declined',
    });
    return { message: 'status declined' };
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
      await this.CompanyModel.findByIdAndUpdate(id, {
    $push: { vacancies: newVacancy._id },
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




// vacancy/send-cv/6882310533f5ceba8147cc75         comapny.email