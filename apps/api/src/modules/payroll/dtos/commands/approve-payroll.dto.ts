import { IsNotEmpty, IsUUID } from 'class-validator';

export class ApprovePayrollDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;
}