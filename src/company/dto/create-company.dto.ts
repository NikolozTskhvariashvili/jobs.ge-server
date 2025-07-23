import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCompanyDto {
      @IsNotEmpty()
      @IsString()
      companyName: string;
    
      @IsNotEmpty()
      @IsEmail()
      email: string;
    
      @IsNotEmpty()
      @IsString()
      password: string;
    
      @IsNotEmpty()
      @IsNumber()
      phoneNumber: number;
    
      @IsNotEmpty()
      @IsString()
      aboutUs: string;

      @IsOptional()
      @IsString()
      image:string
}
