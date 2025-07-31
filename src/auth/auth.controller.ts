import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CompanySignUpDto } from './dto/CompanySignUp.dto';
import { CompanySignInDto } from './dto/Company-SignIn.dto';
import { IsAuth } from './guard/isAuth.guard';
import { UserSignUpDto } from './dto/User-SignUp.dto';
import { UserSignInDto } from './dto/User-SignIn.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post('company/sign-up')
  @UseInterceptors(FileInterceptor('file'))
  SignUpCompany(@Body() companySignUpDto: CompanySignUpDto,@UploadedFile() file: Express.Multer.File) {
    return this.authService.SignUpCompany(companySignUpDto,file );
  }

  @Post('company/sign-in')
  @UseInterceptors(FileFieldsInterceptor([]))
  SignInCompany(@Body() CompanySignInDto: CompanySignInDto) {
    return this.authService.SignInCompany(CompanySignInDto);
  }

  @Post('user/sign-up')
   @UseInterceptors(FileInterceptor('file'))
  SignUpUser(@Body() UserSignUpDto: UserSignUpDto,@UploadedFile() file: Express.Multer.File) {
    return this.authService.SignUpUser(UserSignUpDto,file);
  }

  @Post('user/sign-in')
  @UseInterceptors(FileFieldsInterceptor([]))
  SignInUser(@Body() UserSignInDto: UserSignInDto) {
    return this.authService.SignInUser(UserSignInDto);
  }

  @UseGuards(IsAuth)
  @Get('current-company')
  CurrentCompany(@Req() req) {
    return this.authService.currentCompany(req.customerId);
  }

  @UseGuards(IsAuth)
  @Get('current-user')
  CurrentUser(@Req() req) {
    return this.authService.CurrentUser(req.customerId);
  }
}
