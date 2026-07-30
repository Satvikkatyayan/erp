import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { ApiPayrollRunStatusEnum, ApiPayrollReviewStatusEnum } from '../shared/enums.dto';

export class PayrollFiltersDto {
  @IsOptional()
  @IsEnum(ApiPayrollRunStatusEnum)
  status?: ApiPayrollRunStatusEnum;

  @IsOptional()
  @IsUUID()
  periodId?: string;

  @IsOptional()
  @IsUUID()
  branchId?: string;

  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @IsOptional()
  @IsUUID()
  projectId?: string;

  @IsOptional()
  @IsUUID()
  designationId?: string;

  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @IsOptional()
  @IsString()
  workflowStatus?: string;

  @IsOptional()
  @IsEnum(ApiPayrollReviewStatusEnum)
  reviewStatus?: ApiPayrollReviewStatusEnum;
}