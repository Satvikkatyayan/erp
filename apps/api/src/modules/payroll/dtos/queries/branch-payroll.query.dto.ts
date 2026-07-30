import { IsNotEmpty, IsUUID } from 'class-validator';
import { PayrollRunQueryDto } from './payroll-run.query.dto';

export class BranchPayrollQueryDto extends PayrollRunQueryDto {
  @IsNotEmpty()
  @IsUUID()
  branchId: string;
}