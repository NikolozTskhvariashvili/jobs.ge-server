import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;


  @IsNotEmpty()
  // @IsNumber()
  phoneNumber: string;
}
