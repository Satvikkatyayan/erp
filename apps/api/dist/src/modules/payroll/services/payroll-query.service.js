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
exports.PayrollQueryService = void 0;
const common_1 = require("@nestjs/common");
const payroll_run_repository_1 = require("../repositories/payroll-run.repository");
const payroll_calculation_repository_1 = require("../repositories/payroll-calculation.repository");
const payslip_repository_1 = require("../repositories/payslip.repository");
const journal_repository_1 = require("../repositories/journal.repository");
const payment_batch_repository_1 = require("../repositories/payment-batch.repository");
const arrear_repository_1 = require("../repositories/arrear.repository");
const payroll_adjustment_repository_1 = require("../repositories/payroll-adjustment.repository");
let PayrollQueryService = class PayrollQueryService {
    constructor(runRepo, calcRepo, payslipRepo, journalRepo, batchRepo, arrearRepo, adjustmentRepo) {
        this.runRepo = runRepo;
        this.calcRepo = calcRepo;
        this.payslipRepo = payslipRepo;
        this.journalRepo = journalRepo;
        this.batchRepo = batchRepo;
        this.arrearRepo = arrearRepo;
        this.adjustmentRepo = adjustmentRepo;
    }
    async getDashboardStats(tenantId) {
        return this.runRepo.getDashboardStats(tenantId);
    }
    async getPayrollRunSummary(tenantId, runId) {
        return this.runRepo.getRunSummary(tenantId, runId);
    }
    async getPayrollRunDetails(tenantId, runId) {
        return this.runRepo.getRunDetails(tenantId, runId);
    }
    async getEmployeePayrollSummary(tenantId, employeeId, runId) {
        return this.calcRepo.getEmployeePayrollSummary(tenantId, employeeId, runId);
    }
    async getEmployeePayrollHistory(tenantId, employeeId, limit = 10, offset = 0) {
        return this.calcRepo.getEmployeePayrollHistory(tenantId, employeeId, limit, offset);
    }
    async getEmployeePayslipHistory(tenantId, employeeId, limit = 10, offset = 0) {
        return this.payslipRepo.getEmployeePayslipHistory(tenantId, employeeId, limit, offset);
    }
    async getPayslips(ctx) {
        return this.payslipRepo.getPayslips(ctx);
    }
    async getLatestPayslip(ctx) {
        return this.payslipRepo.getLatestPayslip(ctx);
    }
    async getPayslipById(tenantId, id) {
        const payslip = await this.payslipRepo.findById(id);
        if (payslip && payslip.tenantId === tenantId) {
            return payslip;
        }
        return null;
    }
    async getLatestPayslipForCalculation(tenantId, calculationId) {
        return this.payslipRepo.getLatest(calculationId, tenantId);
    }
    async getPayslipVersion(tenantId, calculationId, versionNumber) {
        return this.payslipRepo.getVersion(calculationId, tenantId, versionNumber);
    }
    async getPayslipVersionHistory(tenantId, calculationId) {
        return this.payslipRepo.getHistory(calculationId, tenantId);
    }
    async getEmployeeCalculationBreakdown(tenantId, calculationId) {
        return this.calcRepo.getCalculationBreakdown(tenantId, calculationId);
    }
    async getProjectPayrollSummary(tenantId) {
        return this.runRepo.getOrganizationalSummary(tenantId, 'PROJECT');
    }
    async getDepartmentPayrollSummary(tenantId) {
        return this.runRepo.getOrganizationalSummary(tenantId, 'DEPARTMENT');
    }
    async getCostCenterPayrollSummary(tenantId) {
        return this.runRepo.getOrganizationalSummary(tenantId, 'COST_CENTER');
    }
    async getDesignationPayrollSummary(tenantId) {
        return this.runRepo.getOrganizationalSummary(tenantId, 'DESIGNATION');
    }
    async getBranchPayrollSummary(tenantId) {
        return this.runRepo.getOrganizationalSummary(tenantId, 'BRANCH');
    }
    async getPayrollTimeline(tenantId, runId) {
        return [];
    }
    async getPayrollEventHistory(tenantId, runId) {
        return [];
    }
    async getPayrollSnapshotHistory(tenantId, runId) {
        const runDetails = await this.runRepo.getRunDetails(tenantId, runId);
        return runDetails?.snapshots || [];
    }
    async getCalculationHistory(tenantId, runId) {
        const runDetails = await this.runRepo.getRunDetails(tenantId, runId);
        return runDetails?.calculations || [];
    }
    async getStateTransitionHistory(tenantId, runId) {
        return [];
    }
    async getVersionHistory(tenantId, runId) {
        return [];
    }
    async searchAndFilterRuns(tenantId, query, filters, limit = 10, offset = 0) {
        return this.runRepo.searchAndFilterRuns(tenantId, query, filters, limit, offset);
    }
    async getJournal(tenantId, payrollRunId) {
        return this.journalRepo.getJournal(tenantId, payrollRunId);
    }
    async getJournalEntries(tenantId, journalId) {
        return this.journalRepo.getEntries(journalId);
    }
    async getPaymentBatch(tenantId, payrollRunId) {
        return this.batchRepo.getBatch(tenantId, payrollRunId);
    }
    async getPaymentInstructions(tenantId, batchId) {
        return [];
    }
    async getEmployeeAdjustments(tenantId, employeeId) {
        return this.adjustmentRepo.getAdjustmentsForEmployee(tenantId, employeeId);
    }
    async getArrears(tenantId, employeeId) {
        return this.arrearRepo.getArrearsForEmployee(tenantId, employeeId);
    }
};
exports.PayrollQueryService = PayrollQueryService;
exports.PayrollQueryService = PayrollQueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payroll_run_repository_1.PayPayrollRunRepository,
        payroll_calculation_repository_1.PayPayrollCalculationRepository,
        payslip_repository_1.PayPayslipRepository,
        journal_repository_1.PayJournalRepository,
        payment_batch_repository_1.PayPaymentBatchRepository,
        arrear_repository_1.PayArrearRepository,
        payroll_adjustment_repository_1.PayPayrollAdjustmentRepository])
], PayrollQueryService);
//# sourceMappingURL=payroll-query.service.js.map