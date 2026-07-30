import { IsNotEmpty, IsUUID } from 'class-validator';

export class StartPayrollCollectionDto {
  @IsNotEmpty()
  @IsUUID()
  runId: string;
}