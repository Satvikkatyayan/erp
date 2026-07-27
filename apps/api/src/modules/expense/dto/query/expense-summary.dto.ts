export class ExpenseSummaryDto {
  claimId: string;
  employeeId: string;
  amount: number;
  currency: string;
  status: string;
  submittedAt?: Date;
  approvedAt?: Date;
}
