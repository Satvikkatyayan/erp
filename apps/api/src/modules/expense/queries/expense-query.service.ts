import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpenseQueryService {
  async getClaim(claimId: string): Promise<any> {}
  async getEmployeeClaims(employeeId: string): Promise<any[]> { return []; }
  async getManagerApprovalQueue(managerId: string): Promise<any[]> { return []; }
  async getFinanceApprovalQueue(): Promise<any[]> { return []; }
  async getClaimsByStatus(status: string): Promise<any[]> { return []; }
  async searchClaims(criteria: any): Promise<any[]> { return []; }
}
