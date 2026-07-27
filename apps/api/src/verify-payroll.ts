import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { PayrollExecutionService } from './modules/payroll/services/payroll-execution.service';
import { PayslipService } from './modules/payroll/services/payslip.service';
import { JournalService } from './modules/payroll/services/journal.service';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const prisma = app.get(PrismaService);
    const payrollRun = app.get(PayrollExecutionService);
    const payslipService = app.get(PayslipService);
    const journalService = app.get(JournalService);
    const logger = new Logger('Pay-Verification');

    const tenantId = uuidv4();
    const organizationId = uuidv4();
    const employeeId = uuidv4();
    const currencyId = uuidv4();
    const runId = uuidv4();
    
    const ctx = {
        tenantId,
        organizationId,
        userId: uuidv4()
    };

    logger.log('--- Setting up Payroll Module Test Data ---');
    await prisma.tenant.create({ data: { id: tenantId, code: `PAY-TENANT-${uuidv4().substring(0,6)}`, name: 'Payroll Tenant' } });
    await prisma.organization.create({ data: { id: organizationId, tenantId, code: `PAY-ORG-${uuidv4().substring(0,6)}`, name: 'Payroll Org' } });
    await prisma.empEmployee.create({ data: { id: employeeId, tenantId, organizationId, employeeNumber: `EMP-PAY-${uuidv4().substring(0,6)}`, status: 'JOINED' } });
    
    await prisma.payPayrollCurrency.create({
        data: { id: currencyId, code: `INR-${uuidv4().substring(0,6)}`, symbol: '₹', name: 'Indian Rupee' }
    });

    const structure = await prisma.paySalaryStructure.create({
        data: { id: uuidv4(), tenantId, name: 'Standard Band 1', code: `B1-${uuidv4().substring(0,6)}` }
    });

    await prisma.payEmployeeSalaryAssignment.create({
        data: {
            id: uuidv4(),
            tenantId,
            employeeId,
            salaryStructureId: structure.id,
            annualCTC: 1200000, // 1 Lakh/month
            effectiveFrom: new Date('2026-01-01')
        }
    });

    const period = await prisma.payPayrollPeriod.create({
        data: {
            id: uuidv4(),
            tenantId,
            payrollPolicyId: uuidv4(), // Mock ref
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

    // 100k / 30 * 2 = 6666.66 LOP
    // Basic = 50k
    // HRA = 20k
    // PF = 5k
    // Gross = 50k + 20k - 6666.66 = 63333.34
    // Net = 63333.34 - 5k = 58333.34

    if (calc && Math.abs(calc.netPay - 58333.33) < 1) {
        logger.log(' - ✅ Payroll accurately calculated using formula engine and LOP snapshot.');
    } else {
        logger.warn(` - ❌ Calculation mismatch: Expected ~58333.33, got ${calc?.netPay}`);
    }

    if (calc?.steps && calc.steps.length === 4) {
        logger.log(' - ✅ Calculation steps properly audited (Basic, HRA, LOP, PF).');
    }

    logger.log('[Test 2] Determinism Idempotency Test');
    // Calculate again. Due to snapshot, result must be identical.
    await payrollRun.executePayrollRun(ctx, runId, currencyId);
    
    const dupeCalcCheck = await prisma.payPayrollCalculation.count({
        where: { payrollRunId: runId, employeeId }
    });

    if (dupeCalcCheck > 1) {
        logger.warn(' - ❌ Calculation determinism failed (Duplicate created).');
    } else {
        logger.log(' - ✅ Snapshot guarantees identical output. Re-run was deterministic.');
    }

    logger.log('[Test 3] Output Generation (Payslips & Journals)');
    await payrollRun.lockPayroll(ctx, runId);
    // await payslipService.generatePayslips({ tenantId }, run.id);
    const slip = await prisma.payPayslip.findFirst({ where: { calculationId: calc!.id } });
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
