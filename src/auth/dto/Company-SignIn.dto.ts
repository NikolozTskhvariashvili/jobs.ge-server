import { IsEmail, IsNotEmpty, IsString } from "class-validator";



export class CompanySignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;


}