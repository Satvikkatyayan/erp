export class BudgetUtilizationDto {
  budgetId: string;
  utilizationPercentage: number;
  categories: Array<{
    category: string;
    allocated: number;
    consumed: number;
  }>;
}
