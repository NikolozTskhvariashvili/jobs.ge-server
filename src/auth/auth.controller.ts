import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CompanySignUpDto } from './dto/CompanySignUp.dto';
import { CompanySignInDto } from './dto/Company-SignIn.dto';
import { IsAuth } from './guard/isAuth.guard';

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

  @UseGuards(IsAuth)
  @Get('company/current-company')
  CurrentCompany(@Req() req) {
    return this.authService.currentCompany(req.companyId);
  }
}
