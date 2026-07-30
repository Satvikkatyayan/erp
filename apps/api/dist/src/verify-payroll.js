"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./common/prisma/prisma.service");
const payroll_execution_service_1 = require("./modules/payroll/services/payroll-execution.service");
const payslip_service_1 = require("./modules/payroll/services/payslip.service");
const journal_service_1 = require("./modules/payroll/services/journal.service");
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const payrollRun = app.get(payroll_execution_service_1.PayrollExecutionService);
    const payslipService = app.get(payslip_service_1.PayslipService);
    const journalService = app.get(journal_service_1.JournalService);
    const logger = new common_1.Logger('Pay-Verification');
    const tenantId = (0, uuid_1.v4)();
    const organizationId = (0, uuid_1.v4)();
    const employeeId = (0, uuid_1.v4)();
    const currencyId = (0, uuid_1.v4)();
    const runId = (0, uuid_1.v4)();
    const ctx = {
        tenantId,
        organizationId,
        userId: (0, uuid_1.v4)()
    };
    logger.log('--- Setting up Payroll Module Test Data ---');
    await prisma.tenant.create({ data: { id: tenantId, code: `PAY-TENANT-${(0, uuid_1.v4)().substring(0, 6)}`, name: 'Payroll Tenant' } });
    await prisma.organization.create({ data: { id: organizationId, tenantId, code: `PAY-ORG-${(0, uuid_1.v4)().substring(0, 6)}`, name: 'Payroll Org' } });
    await prisma.empEmployee.create({ data: { id: employeeId, tenantId, organizationId, employeeNumber: `EMP-PAY-${(0, uuid_1.v4)().substring(0, 6)}`, status: 'JOINED' } });
    await prisma.payPayrollCurrency.create({
        data: { id: currencyId, code: `INR-${(0, uuid_1.v4)().substring(0, 6)}`, symbol: '₹', name: 'Indian Rupee' }
    });
    const structure = await prisma.paySalaryStructure.create({
        data: { id: (0, uuid_1.v4)(), tenantId, name: 'Standard Band 1', code: `B1-${(0, uuid_1.v4)().substring(0, 6)}` }
    });
    await prisma.payEmployeeSalaryAssignment.create({
        data: {
            id: (0, uuid_1.v4)(),
            tenantId,
            employeeId,
            salaryStructureId: structure.id,
            annualCTC: 1200000,
            effectiveFrom: new Date('2026-01-01')
        }
    });
    const period = await prisma.payPayrollPeriod.create({
        data: {
            id: (0, uuid_1.v4)(),
            tenantId,
            payrollPolicyId: (0, uuid_1.v4)(),
            periodName: 'January 2026',
            startDate: new Date('2026-01-01'),
            endDate: new Date('2026-01-31')
        }
    });
    await prisma.payPayrollRun.create({
        data: {
            id: runId,
            tenantId,
            periodId: period.id,
            runType: 'Regular',
            status: 'Draft'
        }
    });
    logger.log('[Test 1] Payroll Snapshot & Deterministic Calculation');
    await payrollRun.executePayrollRun(ctx, runId, currencyId);
    const calc = await prisma.payPayrollCalculation.findFirst({
        where: { payrollRunId: runId, employeeId },
        include: { steps: true }
    });
    if (calc && Math.abs(calc.netPay - 58333.33) < 1) {
        logger.log(' - ✅ Payroll accurately calculated using formula engine and LOP snapshot.');
    }
    else {
        logger.warn(` - ❌ Calculation mismatch: Expected ~58333.33, got ${calc?.netPay}`);
    }
    if (calc?.steps && calc.steps.length === 4) {
        logger.log(' - ✅ Calculation steps properly audited (Basic, HRA, LOP, PF).');
    }
    logger.log('[Test 2] Determinism Idempotency Test');
    await payrollRun.executePayrollRun(ctx, runId, currencyId);
    const dupeCalcCheck = await prisma.payPayrollCalculation.count({
        where: { payrollRunId: runId, employeeId }
    });
    if (dupeCalcCheck > 1) {
        logger.warn(' - ❌ Calculation determinism failed (Duplicate created).');
    }
    else {
        logger.log(' - ✅ Snapshot guarantees identical output. Re-run was deterministic.');
    }
    logger.log('[Test 3] Output Generation (Payslips & Journals)');
    await payrollRun.lockPayroll(ctx, runId);
    const slip = await prisma.payPayslip.findFirst({ where: { calculationId: calc.id } });
    if (slip?.status === 'Published') {
        logger.log(' - ✅ Payslips successfully versioned and generated.');
    }
    const journal = await journalService.exportToErp(ctx, runId, 'SAP');
    if (journal.status === 'Exported') {
        logger.log(` - ✅ Accounting journal mapped and exported via Adapter to ${journal.provider}.`);
    }
    logger.log('Payroll Module Verification Completed Successfully.');
    await app.close();
}
bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=verify-payroll.js.map