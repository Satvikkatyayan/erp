import { IsNotEmpty, IsUUID } from 'class-validator';

export class RegenerateEmployeePayrollDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;

  @IsNotEmpty()
  @IsUUID()
  employeeId: string;

  @IsNotEmpty()
  @IsUUID()
  currencyId: string;
}