import { IsNotEmpty, IsUUID } from 'class-validator';

export class CalculatePayrollDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;

  @IsNotEmpty()
  @IsUUID()
  currencyId: string;
}