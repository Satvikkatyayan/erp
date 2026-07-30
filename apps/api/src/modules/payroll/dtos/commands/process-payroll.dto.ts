import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProcessPayrollDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;
}