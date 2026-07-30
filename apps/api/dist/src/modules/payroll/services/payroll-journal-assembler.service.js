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
exports.PayrollJournalAssembler = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const crypto = __importStar(require("crypto"));
let PayrollJournalAssembler = class PayrollJournalAssembler {
    assembleEntries(ctx) {
        const { payrollRunId, calculations, calculationSteps, payslips, salaryComponents } = ctx;
        const entries = [];
        const componentMap = new Map();
        salaryComponents.forEach(c => componentMap.set(c.id, c));
        const payslipMap = new Map();
        payslips.forEach(p => payslipMap.set(p.calculation.employeeId, p));
        for (const calc of calculations) {
            const steps = calculationSteps.filter(s => s.calculationId === calc.id);
            const payslip = payslipMap.get(calc.employeeId);
            if (!payslip)
                continue;
            for (const step of steps) {
                const component = componentMap.get(step.componentId);
                if (!component)
                    continue;
                const accountCode = `ACC-${component.type.toUpperCase()}`;
                const accountName = `${component.name} Account`;
                const isEarning = component.type === 'Earning';
                const debit = isEarning ? step.calculatedValue : 0;
                const credit = !isEarning ? Math.abs(step.calculatedValue) : 0;
                if (debit === 0 && credit === 0)
                    continue;
                const checksumInput = JSON.stringify({
                    employeeId: calc.employeeId,
                    payrollRunId,
                    calculationId: calc.id,
                    payslipId: payslip.id,
                    accountCode,
                    debit,
                    credit
                });
                const checksum = crypto.createHash('sha256').update(checksumInput).digest('hex');
                entries.push({
                    id: (0, uuid_1.v4)(),
                    employeeId: calc.employeeId,
                    payrollRunId,
                    calculationId: calc.id,
                    payslipId: payslip.id,
                    accountCode,
                    accountName,
                    debit,
                    credit,
                    currency: calc.currencyId || 'INR',
                    description: `Payroll Entry for ${component.name}`,
                    entryType: component.type,
                    versionNumber: 1,
                    checksum,
                });
            }
        }
        return entries;
    }
};
exports.PayrollJournalAssembler = PayrollJournalAssembler;
exports.PayrollJournalAssembler = PayrollJournalAssembler = __decorate([
    (0, common_1.Injectable)()
], PayrollJournalAssembler);
//# sourceMappingURL=payroll-journal-assembler.service.js.map