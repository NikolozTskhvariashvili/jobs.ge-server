import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/schemas/user.schema';
import { CompanySchema } from 'src/company/schemas/company.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        schema: UserSchema,
        name: 'user',
      },
      {
        schema: CompanySchema,
        name: 'company',
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
