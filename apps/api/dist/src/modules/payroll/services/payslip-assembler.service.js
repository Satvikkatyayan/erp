"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipAssembler = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let PayslipAssembler = class PayslipAssembler {
    assemble(ctx, previousVersion = 0) {
        const { snapshot, calculation, calculationSteps, employeeData, companyData, salaryStructureVersion, reviewMetadata } = ctx;
        const snapshotData = typeof snapshot.snapshotData === 'string'
            ? JSON.parse(snapshot.snapshotData)
            : snapshot.snapshotData || {};
        const attendanceSummary = snapshotData.attendanceSummary || {
            daysPresent: 0,
            daysAbsent: 0,
            paidLeave: 0,
            unpaidLeave: 0,
            halfDays: 0,
            lateDays: 0,
            overtimeHours: 0,
            attendancePercentage: 0,
            projectAllocationSummary: {},
            siteAllocationSummary: {}
        };
        const earnings = [];
        const deductions = [];
        const employerContributions = [];
        calculationSteps.forEach(step => {
            const componentName = step.componentName || 'Unknown Component';
            const componentType = step.componentType || 'EARNING';
            const item = {
                component: componentName,
                formulaVersion: step.formulaHash || 'v1.0',
                calculatedValue: step.calculatedValue,
                currency: calculation.currencyId || 'INR'
            };
            if (componentType === 'EARNING') {
                earnings.push(item);
            }
            else if (componentType === 'DEDUCTION') {
                deductions.push(item);
            }
            else if (componentType === 'EMPLOYER_CONTRIBUTION') {
                employerContributions.push(item);
            }
        });
        const payslipId = crypto.randomUUID();
        const versionNumber = previousVersion + 1;
        const generatedTimestamp = new Date().toISOString();
        const rawDataStr = JSON.stringify({ calculationId: calculation.id, snapshotId: snapshot.id, version: versionNumber, generatedTimestamp });
        const checksum = crypto.createHash('sha256').update(rawDataStr).digest('hex');
        const payslip = {
            company: {
                name: companyData?.name || 'Company Name',
                businessUnit: companyData?.businessUnit || 'Default BU',
                branch: companyData?.branch || 'HQ',
                department: employeeData?.department || 'General',
                payrollPeriod: snapshotData.periodName || 'Current Period',
                currency: calculation.currencyId || 'INR',
                payDate: new Date().toISOString().split('T')[0],
                runNumber: snapshot.payrollRunId,
                payslipVersion: versionNumber
            },
            employee: {
                id: employeeData?.id || snapshot.employeeId,
                code: employeeData?.code || 'EMP-000',
                name: employeeData?.name || 'Unknown Employee',
                designation: employeeData?.designation || 'Staff',
                department: employeeData?.department || 'General',
                branch: employeeData?.branch || 'HQ',
                employmentType: employeeData?.employmentType || 'Full-Time',
                joiningDate: employeeData?.joiningDate || '2000-01-01',
                salaryStructureVersion: salaryStructureVersion
            },
            attendanceSummary,
            earnings,
            deductions,
            employerContributions,
            totals: {
                grossEarnings: calculation.grossPay || 0,
                grossDeductions: calculation.totalDeductions || 0,
                employerContributions: 0,
                netPay: calculation.netPay || 0,
                roundedAmount: Math.round(calculation.netPay || 0),
                amountInWords: this.numberToWords(Math.round(calculation.netPay || 0))
            },
            reviewMetadata: {
                approvedBy: reviewMetadata?.approvedBy || null,
                approvalWorkflowVersion: reviewMetadata?.workflowVersion || null,
                finalReviewer: reviewMetadata?.finalReviewer || null,
                approvedTimestamp: reviewMetadata?.approvedTimestamp || null,
                lockedTimestamp: reviewMetadata?.lockedTimestamp || null,
                processedTimestamp: reviewMetadata?.processedTimestamp || null
            },
            auditMetadata: {
                calculationVersion: '1.0',
                snapshotVersion: '1.0',
                rulesVersion: '1.0',
                checksum,
                formulaHash: 'combo-hash',
                runId: snapshot.payrollRunId,
                calculationId: calculation.id,
                payslipId,
                generatedTimestamp
            }
        };
        return payslip;
    }
    numberToWords(amount) {
        return `Rupees ${amount} Only`;
    }
};
exports.PayslipAssembler = PayslipAssembler;
exports.PayslipAssembler = PayslipAssembler = __decorate([
    (0, common_1.Injectable)()
], PayslipAssembler);
//# sourceMappingURL=payslip-assembler.service.js.map