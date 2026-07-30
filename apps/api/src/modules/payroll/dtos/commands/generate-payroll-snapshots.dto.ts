import { IsNotEmpty, IsUUID } from 'class-validator';

export class GeneratePayrollSnapshotsDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;
}