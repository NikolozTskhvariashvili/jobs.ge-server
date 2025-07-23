import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { IsAuth } from 'src/auth/guard/isAuth.guard';
import { StatusChange } from 'src/company/dto/change-status.dto';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @UseGuards(IsAuth)
  @Put('Status-approve')
  ApproveStatus(@Req() req, @Body() StatusChange: StatusChange) {
    return this.vacancyService.ApproveStatus(req.customerId, StatusChange);
  }

  @UseGuards(IsAuth)
  @Put('Status-decline')
  DeclineStatus(@Req() req, @Body() StatusChange: StatusChange) {
    return this.vacancyService.DeclineStatus(req.customerId, StatusChange);
  }

  @UseGuards(IsAuth)
  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto, @Req() req) {
    return this.vacancyService.create(createVacancyDto, req.customerId);
  }

  @Get()
  findAll() {
    return this.vacancyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.vacancyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacancyService.update(id, updateVacancyDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.vacancyService.remove(id);
  }
}
