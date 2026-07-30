import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReopenPayrollDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;
}