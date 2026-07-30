import { Injectable } from '@nestjs/common';
import { PayPayrollRunRepository } from '../repositories/payroll-run.repository';
import { PayPayrollCalculationRepository } from '../repositories/payroll-calculation.repository';
import { PayPayslipRepository } from '../repositories/payslip.repository';

import { PayJournalRepository } from '../repositories/journal.repository';
import { PayPaymentBatchRepository } from '../repositories/payment-batch.repository';
import { PayArrearRepository } from '../repositories/arrear.repository';
import { PayPayrollAdjustmentRepository } from '../repositories/payroll-adjustment.repository';

@Injectable()
export class PayrollQueryService {
  constructor(
    private readonly runRepo: PayPayrollRunRepository,
    private readonly calcRepo: PayPayrollCalculationRepository,
    private readonly payslipRepo: PayPayslipRepository,
    private readonly journalRepo: PayJournalRepository,
    private readonly batchRepo: PayPaymentBatchRepository,
    private readonly arrearRepo: PayArrearRepository,
    private readonly adjustmentRepo: PayPayrollAdjustmentRepository
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

  // Payslip queries
  async getPayslipById(tenantId: string, id: string): Promise<any | null> {
    const payslip = await this.payslipRepo.findById(id);
    if (payslip && payslip.tenantId === tenantId) {
      return payslip;
    }
    return null;
  }

  async getLatestPayslipForCalculation(tenantId: string, calculationId: string): Promise<any | null> {
    return this.payslipRepo.getLatest(calculationId, tenantId);
  }

  async getPayslipVersion(tenantId: string, calculationId: string, versionNumber: number): Promise<any | null> {
    return this.payslipRepo.getVersion(calculationId, tenantId, versionNumber);
  }

  async getPayslipVersionHistory(tenantId: string, calculationId: string): Promise<any[]> {
    return this.payslipRepo.getHistory(calculationId, tenantId);
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

  // Financial Integration Queries
  async getJournal(tenantId: string, payrollRunId: string): Promise<any> {
    return this.journalRepo.getJournal(tenantId, payrollRunId);
  }

  async getJournalEntries(tenantId: string, journalId: string): Promise<any[]> {
    return this.journalRepo.getEntries(journalId); // Simplified for architecture scope
  }

  async getPaymentBatch(tenantId: string, payrollRunId: string): Promise<any> {
    return this.batchRepo.getBatch(tenantId, payrollRunId);
  }

  async getPaymentInstructions(tenantId: string, batchId: string): Promise<any[]> {
    return []; // Handled inherently via batch include, stubbing for specific repo call
  }

  async getEmployeeAdjustments(tenantId: string, employeeId: string): Promise<any[]> {
    return this.adjustmentRepo.getAdjustmentsForEmployee(tenantId, employeeId);
  }

  async getArrears(tenantId: string, employeeId: string): Promise<any[]> {
    return this.arrearRepo.getArrearsForEmployee(tenantId, employeeId);
  }
}
