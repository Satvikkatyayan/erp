export interface PayrollRunSummaryDto {
  id: string;
  tenantId: string;
  periodId: string;
  runType: string;
  status: string;
  calculations: any[];
  snapshots: any[];
  createdAt?: Date;
  updatedAt?: Date;
}
