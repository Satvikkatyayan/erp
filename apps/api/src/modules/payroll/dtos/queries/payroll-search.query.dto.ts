import { IsOptional, IsString } from 'class-validator';
import { PayrollRunQueryDto } from './payroll-run.query.dto';

export class PayrollSearchQueryDto extends PayrollRunQueryDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;
}