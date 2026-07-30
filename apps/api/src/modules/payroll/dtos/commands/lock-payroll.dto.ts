import { IsNotEmpty, IsUUID } from 'class-validator';

export class LockPayrollDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;
}