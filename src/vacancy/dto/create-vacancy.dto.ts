import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsString()
  position: string;

    @IsNotEmpty()
  searchKey: string[]


  @IsNotEmpty()
  skill: string[]
}
