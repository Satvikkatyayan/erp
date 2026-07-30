import { Injectable } from '@nestjs/common';
import { PayrollQueryService } from '../services/payroll-query.service';
import { PayrollDashboardDto } from './dtos/payroll-dashboard.dto';
import { PayrollRunSummaryDto } from './dtos/payroll-summary.dto';
import { EmployeePayrollDto } from './dtos/employee-payroll.dto';

@Injectable()
export class PlatformPayrollSDK {
  constructor(private readonly queryService: PayrollQueryService) {}

  // Payroll Overview
  async getPayrollDashboard(tenantId: string): Promise<PayrollDashboardDto> {
    return this.queryService.getDashboardStats(tenantId);
  }

  async getPayrollRunSummary(tenantId: string, runId: string): Promise<PayrollRunSummaryDto> {
    return this.queryService.getPayrollRunSummary(tenantId, runId);
  }

  async getPayrollRunDetails(tenantId: string, runId: string): Promise<any> {
    return this.queryService.getPayrollRunDetails(tenantId, runId);
  }

  // Employee Payroll
  async getEmployeePayrollSummary(tenantId: string, employeeId: string, payrollRunId: string): Promise<EmployeePayrollDto> {
    return this.queryService.getEmployeePayrollSummary(tenantId, employeeId, payrollRunId);
  }

  async getEmployeePayrollHistory(tenantId: string, employeeId: string, limit?: number, offset?: number): Promise<any[]> {
    return this.queryService.getEmployeePayrollHistory(tenantId, employeeId, limit, offset);
  }

  async getEmployeeCalculationBreakdown(tenantId: string, calculationId: string): Promise<any[]> {
    return this.queryService.getEmployeeCalculationBreakdown(tenantId, calculationId);
  }

  async getEmployeePayslipHistory(tenantId: string, employeeId: string, limit?: number, offset?: number): Promise<any[]> {
    return this.queryService.getEmployeePayslipHistory(tenantId, employeeId, limit, offset);
  }

  async getLatestPayslip(ctx: any): Promise<any> {
    return this.queryService.getLatestPayslip(ctx);
  }

  // Payslip Retrieval Methods
  async getPayslipById(tenantId: string, id: string): Promise<any> {
    return this.queryService.getPayslipById(tenantId, id);
  }

  async getLatestPayslipForCalculation(tenantId: string, calculationId: string): Promise<any> {
    return this.queryService.getLatestPayslipForCalculation(tenantId, calculationId);
  }

  async getPayslipVersion(tenantId: string, calculationId: string, versionNumber: number): Promise<any> {
    return this.queryService.getPayslipVersion(tenantId, calculationId, versionNumber);
  }

  async getPayslipVersionHistory(tenantId: string, calculationId: string): Promise<any[]> {
    return this.queryService.getPayslipVersionHistory(tenantId, calculationId);
  }

  // Payroll Statistics
  async getProjectPayrollSummary(tenantId: string): Promise<any[]> {
    return this.queryService.getProjectPayrollSummary(tenantId);
  }

  async getDepartmentPayrollSummary(tenantId: string): Promise<any[]> {
    return this.queryService.getDepartmentPayrollSummary(tenantId);
  }

  async getCostCenterPayrollSummary(tenantId: string): Promise<any[]> {
    return this.queryService.getCostCenterPayrollSummary(tenantId);
  }

  async getBranchPayrollSummary(tenantId: string): Promise<any[]> {
    return this.queryService.getBranchPayrollSummary(tenantId);
  }

  async getDesignationPayrollSummary(tenantId: string): Promise<any[]> {
    return this.queryService.getDesignationPayrollSummary(tenantId);
  }

  // Audit
  async getPayrollTimeline(tenantId: string, runId: string): Promise<any[]> {
    return this.queryService.getPayrollTimeline(tenantId, runId);
  }

  async getPayrollEventHistory(tenantId: string, runId: string): Promise<any[]> {
    return this.queryService.getPayrollEventHistory(tenantId, runId);
  }

  async getPayrollSnapshotHistory(tenantId: string, runId: string): Promise<any[]> {
    return this.queryService.getPayrollSnapshotHistory(tenantId, runId);
  }

  async getCalculationHistory(tenantId: string, runId: string): Promise<any[]> {
    return this.queryService.getCalculationHistory(tenantId, runId);
  }

  async getStateTransitionHistory(tenantId: string, runId: string): Promise<any[]> {
    return this.queryService.getStateTransitionHistory(tenantId, runId);
  }

  async getVersionHistory(tenantId: string, runId: string): Promise<any[]> {
    return this.queryService.getVersionHistory(tenantId, runId);
  }

  // Search
  async searchPayrollRuns(tenantId: string, query: string, limit?: number, offset?: number): Promise<any[]> {
    return this.queryService.searchAndFilterRuns(tenantId, query, {}, limit, offset);
  }

  async searchEmployees(tenantId: string, query: string): Promise<any[]> {
    // Requires employee resolving logic. Kept as stub for query routing.
    return [];
  }

  async filterPayrollRuns(tenantId: string, filters: any, limit?: number, offset?: number): Promise<any[]> {
    return this.queryService.searchAndFilterRuns(tenantId, '', filters, limit, offset);
  }

  // Financial Integration
  async getJournal(tenantId: string, payrollRunId: string): Promise<any> {
    return this.queryService.getJournal(tenantId, payrollRunId);
  }

  async getJournalEntries(tenantId: string, journalId: string): Promise<any[]> {
    return this.queryService.getJournalEntries(tenantId, journalId);
  }

  async getPaymentBatch(tenantId: string, payrollRunId: string): Promise<any> {
    return this.queryService.getPaymentBatch(tenantId, payrollRunId);
  }

  async getPaymentInstructions(tenantId: string, batchId: string): Promise<any[]> {
    return this.queryService.getPaymentInstructions(tenantId, batchId);
  }

  async getEmployeeAdjustments(tenantId: string, employeeId: string): Promise<any[]> {
    return this.queryService.getEmployeeAdjustments(tenantId, employeeId);
  }

  async getArrearHistory(tenantId: string, employeeId: string): Promise<any[]> {
    return this.queryService.getArrears(tenantId, employeeId);
  }
}
