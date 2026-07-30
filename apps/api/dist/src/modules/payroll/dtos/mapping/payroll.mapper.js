"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollMapper = void 0;
const common_1 = require("@nestjs/common");
const payroll_run_response_dto_1 = require("../responses/payroll-run.response.dto");
const employee_payroll_response_dto_1 = require("../responses/employee-payroll.response.dto");
const financial_dto_1 = require("../financial/financial.dto");
let PayrollMapper = class PayrollMapper {
    toCreatePayrollRunCommand(dto, tenantId) {
        return {
            periodId: dto.periodId,
            runType: dto.runType,
            tenantId
        };
    }
    toStartPayrollCollectionCommand(dto, tenantId) {
        return {
            runId: dto.runId,
            tenantId
        };
    }
    toPayrollRunResponseDto(entity) {
        const dto = new payroll_run_response_dto_1.PayrollRunResponseDto();
        dto.id = entity.id;
        dto.tenantId = entity.tenantId;
        dto.periodId = entity.periodId;
        dto.runType = entity.runType;
        dto.status = entity.status;
        dto.lockedScopes = entity.lockedScopes;
        dto.createdAt = entity.createdAt?.toISOString();
        dto.updatedAt = entity.updatedAt?.toISOString();
        return dto;
    }
    toEmployeePayrollResponseDto(entity) {
        const dto = new employee_payroll_response_dto_1.EmployeePayrollResponseDto();
        dto.employeeId = entity.employeeId;
        dto.employeeName = entity.employeeName;
        dto.calculation = entity.calculation;
        return dto;
    }
    toPayslipResponseDto(entity) {
        if (!entity)
            return null;
        return {
            id: entity.id,
            tenantId: entity.tenantId,
            versionNumber: entity.versionNumber,
            status: entity.status,
            documentUrl: entity.documentUrl,
            company: entity.payslipData?.company,
            employee: entity.payslipData?.employee,
            attendanceSummary: entity.payslipData?.attendanceSummary,
            earnings: entity.payslipData?.earnings || [],
            deductions: entity.payslipData?.deductions || [],
            employerContributions: entity.payslipData?.employerContributions || [],
            totals: entity.payslipData?.totals,
            auditMetadata: entity.payslipData?.auditMetadata,
            reviewMetadata: entity.payslipData?.reviewMetadata
        };
    }
    toJournalDto(entity) {
        if (!entity)
            return null;
        const dto = new financial_dto_1.JournalDto();
        dto.id = entity.id;
        dto.tenantId = entity.tenantId;
        dto.payrollRunId = entity.payrollRunId;
        dto.versionNumber = entity.versionNumber;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt?.toISOString();
        if (entity.entries) {
            dto.entries = entity.entries.map((e) => this.toJournalEntryDto(e));
        }
        return dto;
    }
    toJournalEntryDto(entity) {
        const dto = new financial_dto_1.JournalEntryDto();
        dto.id = entity.id;
        dto.employeeId = entity.employeeId;
        dto.accountCode = entity.accountCode;
        dto.accountName = entity.accountName;
        dto.debit = entity.debit;
        dto.credit = entity.credit;
        dto.currency = entity.currency;
        dto.description = entity.description;
        dto.entryType = entity.entryType;
        dto.checksum = entity.checksum;
        return dto;
    }
    toPaymentBatchDto(entity) {
        if (!entity)
            return null;
        const dto = new financial_dto_1.PaymentBatchDto();
        dto.id = entity.id;
        dto.tenantId = entity.tenantId;
        dto.payrollRunId = entity.payrollRunId;
        dto.versionNumber = entity.versionNumber;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt?.toISOString();
        if (entity.instructions) {
            dto.instructions = entity.instructions.map((i) => this.toPaymentInstructionDto(i));
        }
        return dto;
    }
    toPaymentInstructionDto(entity) {
        const dto = new financial_dto_1.PaymentInstructionDto();
        dto.id = entity.id;
        dto.employeeId = entity.employeeId;
        dto.netPay = entity.netPay;
        dto.currency = entity.currency;
        dto.bankAccountReference = entity.bankAccountReference;
        dto.paymentMethod = entity.paymentMethod;
        dto.paymentStatus = entity.paymentStatus;
        dto.referenceNumber = entity.referenceNumber;
        return dto;
    }
    toAdjustmentDto(entity) {
        if (!entity)
            return null;
        const dto = new financial_dto_1.AdjustmentDto();
        dto.id = entity.id;
        dto.employeeId = entity.employeeId;
        dto.runId = entity.runId;
        dto.type = entity.type;
        dto.amount = entity.amount;
        dto.reason = entity.reason;
        dto.versionNumber = entity.versionNumber;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt?.toISOString();
        return dto;
    }
    toArrearDto(entity) {
        if (!entity)
            return null;
        const dto = new financial_dto_1.ArrearDto();
        dto.id = entity.id;
        dto.employeeId = entity.employeeId;
        dto.previousRunId = entity.previousRunId;
        dto.currentRunId = entity.currentRunId;
        dto.reason = entity.reason;
        dto.amount = entity.amount;
        dto.versionNumber = entity.versionNumber;
        dto.status = entity.status;
        dto.createdAt = entity.createdAt?.toISOString();
        return dto;
    }
};
exports.PayrollMapper = PayrollMapper;
exports.PayrollMapper = PayrollMapper = __decorate([
    (0, common_1.Injectable)()
], PayrollMapper);
//# sourceMappingURL=payroll.mapper.js.map