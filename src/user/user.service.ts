import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private UserModel: Model<User>) {}


  async findAll() {
    const users = await this.UserModel.find()
    return users;
  }

  async findOne(id) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const user = await this.UserModel.findById(id);
    if (!user) throw new BadRequestException('user not found');
    return user;
  }

  async update(id, {email,fullName,password,phoneNumber}: UpdateUserDto) {
    if(!isValidObjectId(id)) throw new BadRequestException('invalid id')
      const user = await this.UserModel.findById(id)
    if(!user) throw new BadRequestException('user not found')
      await this.UserModel.findByIdAndUpdate(id, {
        email,fullName,password,phoneNumber
      })
      return {message:"user updated succsesfully"}
  }

  async remove(id) {
        if(!isValidObjectId(id)) throw new BadRequestException('invalid id')
      const user = await this.UserModel.findById(id)
    if(!user) throw new BadRequestException('user not found')
      await this.UserModel.findByIdAndDelete(id)
    return {message:"user deleted succsesfully"}
  }
}
