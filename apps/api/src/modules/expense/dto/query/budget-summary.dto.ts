export class BudgetSummaryDto {
  budgetId: string;
  departmentId: string;
  totalBudget: number;
  consumed: number;
  available: number;
  fiscalYear: string;
}
