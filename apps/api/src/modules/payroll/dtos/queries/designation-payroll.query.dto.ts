import { IsNotEmpty, IsUUID } from 'class-validator';
import { PayrollRunQueryDto } from './payroll-run.query.dto';

export class DesignationPayrollQueryDto extends PayrollRunQueryDto {
  @IsNotEmpty()
  @IsUUID()
  designationId: string;
}