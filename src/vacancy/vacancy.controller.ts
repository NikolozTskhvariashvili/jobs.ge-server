import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { IsAuth } from 'src/auth/guard/isAuth.guard';

@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @UseGuards(IsAuth)
  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto, @Req() req) {
    return this.vacancyService.create(createVacancyDto, req.companyId);
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
