export class ManagerApprovalDto {
  approvalId: string;
  type: 'EXPENSE' | 'TRAVEL';
  referenceId: string;
  employeeName: string;
  amount: number;
  currency: string;
  submittedAt: Date;
}
