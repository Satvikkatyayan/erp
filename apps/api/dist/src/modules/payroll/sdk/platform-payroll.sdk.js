"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformPayrollSDK = void 0;
const common_1 = require("@nestjs/common");
const payroll_query_service_1 = require("../services/payroll-query.service");
let PlatformPayrollSDK = class PlatformPayrollSDK {
    constructor(queryService) {
        this.queryService = queryService;
    }
    async getPayrollDashboard(tenantId) {
        return this.queryService.getDashboardStats(tenantId);
    }
    async getPayrollRunSummary(tenantId, runId) {
        return this.queryService.getPayrollRunSummary(tenantId, runId);
    }
    async getPayrollRunDetails(tenantId, runId) {
        return this.queryService.getPayrollRunDetails(tenantId, runId);
    }
    async getEmployeePayrollSummary(tenantId, employeeId, payrollRunId) {
        return this.queryService.getEmployeePayrollSummary(tenantId, employeeId, payrollRunId);
    }
    async getEmployeePayrollHistory(tenantId, employeeId, limit, offset) {
        return this.queryService.getEmployeePayrollHistory(tenantId, employeeId, limit, offset);
    }
    async getEmployeeCalculationBreakdown(tenantId, calculationId) {
        return this.queryService.getEmployeeCalculationBreakdown(tenantId, calculationId);
    }
    async getEmployeePayslipHistory(tenantId, employeeId, limit, offset) {
        return this.queryService.getEmployeePayslipHistory(tenantId, employeeId, limit, offset);
    }
    async getLatestPayslip(ctx) {
        return this.queryService.getLatestPayslip(ctx);
    }
    async getPayslipById(tenantId, id) {
        return this.queryService.getPayslipById(tenantId, id);
    }
    async getLatestPayslipForCalculation(tenantId, calculationId) {
        return this.queryService.getLatestPayslipForCalculation(tenantId, calculationId);
    }
    async getPayslipVersion(tenantId, calculationId, versionNumber) {
        return this.queryService.getPayslipVersion(tenantId, calculationId, versionNumber);
    }
    async getPayslipVersionHistory(tenantId, calculationId) {
        return this.queryService.getPayslipVersionHistory(tenantId, calculationId);
    }
    async getProjectPayrollSummary(tenantId) {
        return this.queryService.getProjectPayrollSummary(tenantId);
    }
    async getDepartmentPayrollSummary(tenantId) {
        return this.queryService.getDepartmentPayrollSummary(tenantId);
    }
    async getCostCenterPayrollSummary(tenantId) {
        return this.queryService.getCostCenterPayrollSummary(tenantId);
    }
    async getBranchPayrollSummary(tenantId) {
        return this.queryService.getBranchPayrollSummary(tenantId);
    }
    async getDesignationPayrollSummary(tenantId) {
        return this.queryService.getDesignationPayrollSummary(tenantId);
    }
    async getPayrollTimeline(tenantId, runId) {
        return this.queryService.getPayrollTimeline(tenantId, runId);
    }
    async getPayrollEventHistory(tenantId, runId) {
        return this.queryService.getPayrollEventHistory(tenantId, runId);
    }
    async getPayrollSnapshotHistory(tenantId, runId) {
        return this.queryService.getPayrollSnapshotHistory(tenantId, runId);
    }
    async getCalculationHistory(tenantId, runId) {
        return this.queryService.getCalculationHistory(tenantId, runId);
    }
    async getStateTransitionHistory(tenantId, runId) {
        return this.queryService.getStateTransitionHistory(tenantId, runId);
    }
    async getVersionHistory(tenantId, runId) {
        return this.queryService.getVersionHistory(tenantId, runId);
    }
    async searchPayrollRuns(tenantId, query, limit, offset) {
        return this.queryService.searchAndFilterRuns(tenantId, query, {}, limit, offset);
    }
    async searchEmployees(tenantId, query) {
        return [];
    }
    async filterPayrollRuns(tenantId, filters, limit, offset) {
        return this.queryService.searchAndFilterRuns(tenantId, '', filters, limit, offset);
    }
    async getJournal(tenantId, payrollRunId) {
        return this.queryService.getJournal(tenantId, payrollRunId);
    }
    async getJournalEntries(tenantId, journalId) {
        return this.queryService.getJournalEntries(tenantId, journalId);
    }
    async getPaymentBatch(tenantId, payrollRunId) {
        return this.queryService.getPaymentBatch(tenantId, payrollRunId);
    }
    async getPaymentInstructions(tenantId, batchId) {
        return this.queryService.getPaymentInstructions(tenantId, batchId);
    }
    async getEmployeeAdjustments(tenantId, employeeId) {
        return this.queryService.getEmployeeAdjustments(tenantId, employeeId);
    }
    async getArrearHistory(tenantId, employeeId) {
        return this.queryService.getArrears(tenantId, employeeId);
    }
};
exports.PlatformPayrollSDK = PlatformPayrollSDK;
exports.PlatformPayrollSDK = PlatformPayrollSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payroll_query_service_1.PayrollQueryService])
], PlatformPayrollSDK);
//# sourceMappingURL=platform-payroll.sdk.js.map