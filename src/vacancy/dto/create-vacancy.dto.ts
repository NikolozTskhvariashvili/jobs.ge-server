import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVacancyDto {


    @IsNotEmpty()
    @IsString()
    text: string

        @IsNotEmpty()
    @IsNumber()
    salary: number
}
