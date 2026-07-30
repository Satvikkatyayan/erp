import { IsNotEmpty, IsUUID } from 'class-validator';
import { PayrollRunQueryDto } from './payroll-run.query.dto';

export class CostCenterPayrollQueryDto extends PayrollRunQueryDto {
  @IsNotEmpty()
  @IsUUID()
  costCenterId: string;
}