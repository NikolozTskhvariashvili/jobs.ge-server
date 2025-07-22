import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CompanySignUpDto } from './dto/CompanySignUp.dto';
import { CompanySignInDto } from './dto/Company-SignIn.dto';
import { IsAuth } from './guard/isAuth.guard';
import { UserSignUpDto } from './dto/User-SignUp.dto';
import { UserSignInDto } from './dto/User-SignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('company/sign-up')
  SignUpCompany(@Body() companySignUpDto: CompanySignUpDto) {
    return this.authService.SignUpCompany(companySignUpDto);
  }

  @Post('company/sign-in')
  SignInCompany(@Body() CompanySignInDto: CompanySignInDto) {
    return this.authService.SignInCompany(CompanySignInDto);
  }

  @Post('user/sign-up')
  SignUpUser(@Body() UserSignUpDto:UserSignUpDto){
    return this.authService.SignUpUser(UserSignUpDto)
  }

  @Post('user/sign-in')
  SignInUser(@Body() UserSignInDto:UserSignInDto){
    return this.authService.SignInUser(UserSignInDto)
  }

  @UseGuards(IsAuth)
  @Get('current-company')
  CurrentCompany(@Req() req) {
    return this.authService.currentCompany(req.customerId);
  }


  @UseGuards(IsAuth)
  @Get('current-user')
  CurrentUser(@Req() req){
    return this.authService.CurrentUser(req.customerId)
  }
}
