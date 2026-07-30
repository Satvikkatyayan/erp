import { IsNotEmpty, IsUUID } from 'class-validator';
import { PayrollRunQueryDto } from './payroll-run.query.dto';

export class DepartmentPayrollQueryDto extends PayrollRunQueryDto {
  @IsNotEmpty()
  @IsUUID()
  departmentId: string;
}