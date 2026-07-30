import { IsNotEmpty, IsUUID } from 'class-validator';

export class CancelPayrollDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;
}