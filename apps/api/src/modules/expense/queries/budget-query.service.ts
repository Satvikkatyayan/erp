import { Injectable } from '@nestjs/common';

@Injectable()
export class BudgetQueryService {
  async getBudget(budgetId: string): Promise<any> {}
  async getDepartmentBudget(departmentId: string): Promise<any> {}
  async getReservations(budgetId: string): Promise<any[]> { return []; }
  async getBudgetConsumption(budgetId: string): Promise<any> {}
  async getBudgetUtilization(departmentId: string): Promise<any> {}
}
