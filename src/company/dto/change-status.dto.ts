import { IsNotEmpty, IsString } from 'class-validator';

export class StatusChange {
  @IsNotEmpty()
  @IsString()
  id: string;
}
