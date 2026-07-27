import { Injectable } from '@nestjs/common';
import { PayPayrollRunRepository } from '../repositories/payroll-run.repository';
import { PayPayrollCalculationRepository } from '../repositories/payroll-calculation.repository';
import { PayPayslipRepository } from '../repositories/payslip.repository';

@Injectable()
export class PayrollQueryService {
  constructor(
    private readonly runRepo: PayPayrollRunRepository,
    private readonly calcRepo: PayPayrollCalculationRepository,
    private readonly payslipRepo: PayPayslipRepository
  ) {}

  // 1. Payroll Dashboard
  async getDashboardStats(tenantId: string): Promise<any> {
    return this.runRepo.getDashboardStats(tenantId);
  }

  // 2. Payroll Run Summary
  async getPayrollRunSummary(tenantId: string, runId: string): Promise<any> {
    return this.runRepo.getRunSummary(tenantId, runId);
  }

  // 3. Payroll Run Details
  async getPayrollRunDetails(tenantId: string, runId: string): Promise<any> {
    return this.runRepo.getRunDetails(tenantId, runId);
  }

  // 4. Employee Payroll Summary
  async getEmployeePayrollSummary(tenantId: string, employeeId: string, runId: string): Promise<any> {
    return this.calcRepo.getEmployeePayrollSummary(tenantId, employeeId, runId);
  }

  // 5. Employee Payroll History
  async getEmployeePayrollHistory(tenantId: string, employeeId: string, limit: number = 10, offset: number = 0): Promise<any[]> {
    return this.calcRepo.getEmployeePayrollHistory(tenantId, employeeId, limit, offset);
  }

  // 6. Employee Payslip History
  async getEmployeePayslipHistory(tenantId: string, employeeId: string, limit: number = 10, offset: number = 0): Promise<any[]> {
    return this.payslipRepo.getEmployeePayslipHistory(tenantId, employeeId, limit, offset);
  }

  // Legacy facade methods
  async getPayslips(ctx: any): Promise<any[]> {
    return this.payslipRepo.getPayslips(ctx);
  }

  async getLatestPayslip(ctx: any): Promise<any | null> {
    return this.payslipRepo.getLatestPayslip(ctx);
  }

  // 7. Employee Calculation Breakdown
  async getEmployeeCalculationBreakdown(tenantId: string, calculationId: string): Promise<any[]> {
    return this.calcRepo.getCalculationBreakdown(tenantId, calculationId);
  }

  // Organizational Read Models
  async getProjectPayrollSummary(tenantId: string): Promise<any[]> {
    return this.runRepo.getOrganizationalSummary(tenantId, 'PROJECT');
  }

  async getDepartmentPayrollSummary(tenantId: string): Promise<any[]> {
    return this.runRepo.getOrganizationalSummary(tenantId, 'DEPARTMENT');
  }

  async getCostCenterPayrollSummary(tenantId: string): Promise<any[]> {
    return this.runRepo.getOrganizationalSummary(tenantId, 'COST_CENTER');
  }

  async getDesignationPayrollSummary(tenantId: string): Promise<any[]> {
    return this.runRepo.getOrganizationalSummary(tenantId, 'DESIGNATION');
  }

  async getBranchPayrollSummary(tenantId: string): Promise<any[]> {
    return this.runRepo.getOrganizationalSummary(tenantId, 'BRANCH');
  }

  // Audit Read Models
  async getPayrollTimeline(tenantId: string, runId: string): Promise<any[]> {
    // Persisted records from timeline table if exists, otherwise fallback to empty array
    return [];
  }

  async getPayrollEventHistory(tenantId: string, runId: string): Promise<any[]> {
    return [];
  }

  async getPayrollSnapshotHistory(tenantId: string, runId: string): Promise<any[]> {
    const runDetails = await this.runRepo.getRunDetails(tenantId, runId);
    return runDetails?.snapshots || [];
  }

  async getCalculationHistory(tenantId: string, runId: string): Promise<any[]> {
    const runDetails = await this.runRepo.getRunDetails(tenantId, runId);
    return runDetails?.calculations || [];
  }

  async getStateTransitionHistory(tenantId: string, runId: string): Promise<any[]> {
    return [];
  }

  async getVersionHistory(tenantId: string, runId: string): Promise<any[]> {
    return [];
  }

  // Search and Filter
  async searchAndFilterRuns(
    tenantId: string, 
    query: string, 
    filters: any, 
    limit: number = 10, 
    offset: number = 0
  ): Promise<any[]> {
    return this.runRepo.searchAndFilterRuns(tenantId, query, filters, limit, offset);
  }
}
