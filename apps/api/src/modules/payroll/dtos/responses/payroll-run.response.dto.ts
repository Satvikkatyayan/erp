export class PayrollRunResponseDto {
  id: string;
  tenantId: string;
  periodId: string;
  runType: string;
  status: string;
  lockedScopes?: any;
  createdAt: string;
  updatedAt: string;
}