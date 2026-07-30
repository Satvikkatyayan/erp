import { IsNotEmpty, IsUUID } from 'class-validator';
import { PayrollRunQueryDto } from './payroll-run.query.dto';

export class ProjectPayrollQueryDto extends PayrollRunQueryDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;
}