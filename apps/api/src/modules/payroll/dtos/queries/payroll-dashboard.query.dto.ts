import { IsOptional, IsUUID } from 'class-validator';

export class PayrollDashboardQueryDto {
  @IsOptional()
  @IsUUID()
  tenantId?: string;
}