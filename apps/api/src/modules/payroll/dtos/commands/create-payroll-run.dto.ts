import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePayrollRunDto {
  @IsNotEmpty()
  @IsUUID()
  periodId: string;

  @IsNotEmpty()
  @IsString()
  runType: string;
}