const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps/api/src/modules/payroll');
const dirs = ['controllers', 'services', 'events', 'queries', 'commands', 'validators', 'repositories'];

// Create directories
dirs.forEach(dir => {
    fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
});

// 1. Payroll Formula Engine
const formulaEngine = `
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PayrollFormulaEngine {
    private readonly logger = new Logger(PayrollFormulaEngine.name);

    constructor(private prisma: PrismaService) {}

    async evaluateComponent(ctx: any, employeeId: string, componentCode: string, inputs: Record<string, number>): Promise<number> {
        this.logger.debug(\`Evaluating \${componentCode} via Rules SDK...\`);
        // Mock Rules SDK evaluation
        if (componentCode.startsWith('BASIC')) {
            return inputs['ctc'] * 0.5;
        }
        if (componentCode.startsWith('HRA')) {
            return inputs['ctc'] * 0.2;
        }
        if (componentCode.startsWith('PF')) {
            return inputs['ctc'] * 0.05; // Mock deduction
        }
        return 0;
    }
}
`;
fs.writeFileSync(path.join(baseDir, 'services/payroll-formula.engine.ts'), formulaEngine);

// 2. Payroll Calculation Service
const calcService = `
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PayrollFormulaEngine } from './payroll-formula.engine';

@Injectable()
export class PayrollCalculationService {
    private readonly logger = new Logger(PayrollCalculationService.name);

    constructor(
        private prisma: PrismaService,
        private formulaEngine: PayrollFormulaEngine
    ) {}

    async calculateEmployeePayroll(ctx: any, runId: string, employeeId: string, currencyId: string): Promise<string> {
        this.logger.log(\`Calculating payroll for employee \${employeeId} in run \${runId}\`);

        // Get Snapshot
        const snapshot = await this.prisma.payPayrollSnapshot.findFirst({
            where: { payrollRunId: runId, employeeId }
        });
        
        if (!snapshot) throw new BadRequestException('Payroll snapshot missing for employee');
        const data = snapshot.snapshotData as any;
        const ctc = data.salaryAssignment.annualCTC / 12; // Monthly
        const lopDays = data.attendanceSummary.lopDays || 0;
        
        // Deduction for LOP
        const perDaySalary = ctc / 30;
        const lopDeduction = perDaySalary * lopDays;

        // Formula engine evaluations
        const basic = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'BASIC', { ctc });
        const hra = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'HRA', { ctc });
        const pf = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'PF', { ctc });

        const grossPay = basic + hra - lopDeduction;
        const netPay = grossPay - pf;

        const calc = await this.prisma.payPayrollCalculation.create({
            data: {
                tenantId: ctx.tenantId,
                payrollRunId: runId,
                employeeId,
                grossPay,
                netPay,
                totalDeductions: pf + lopDeduction,
                currencyId
            }
        });

        // Save Steps
        await this.prisma.payCalculationStep.createMany({
            data: [
                { tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'MOCK-BASIC', calculatedValue: basic, executionOrder: 1 },
                { tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'MOCK-HRA', calculatedValue: hra, executionOrder: 2 },
                { tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'MOCK-LOP', calculatedValue: -lopDeduction, executionOrder: 3 },
                { tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'MOCK-PF', calculatedValue: -pf, executionOrder: 4 }
            ]
        });

        return calc.id;
    }
}
`;
fs.writeFileSync(path.join(baseDir, 'services/payroll-calculation.service.ts'), calcService);

// 3. Payroll Run Service
const runService = `
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PayrollCalculationService } from './payroll-calculation.service';
import { PlatformEventBus } from '../../common/platform-sdk/events';

@Injectable()
export class PayrollRunService {
    private readonly logger = new Logger(PayrollRunService.name);

    constructor(
        private prisma: PrismaService,
        private calcService: PayrollCalculationService,
        private eventBus: PlatformEventBus
    ) {}

    async captureSnapshotAndCalculate(ctx: any, runId: string, currencyId: string): Promise<void> {
        this.logger.log(\`Running calculation phase for run \${runId}\`);
        
        await this.prisma.payPayrollRun.update({
            where: { id: runId },
            data: { status: 'Calculating' }
        });

        // 1. Fetch Assignments
        const assignments = await this.prisma.payEmployeeSalaryAssignment.findMany({
            where: { tenantId: ctx.tenantId }
        });

        for (const assign of assignments) {
            // Check if snapshot exists for determinism
            let snapshot = await this.prisma.payPayrollSnapshot.findFirst({
                where: { payrollRunId: runId, employeeId: assign.employeeId }
            });

            if (!snapshot) {
                // Generate Snapshot
                snapshot = await this.prisma.payPayrollSnapshot.create({
                    data: {
                        tenantId: ctx.tenantId,
                        payrollRunId: runId,
                        employeeId: assign.employeeId,
                        snapshotData: {
                            salaryAssignment: assign,
                            attendanceSummary: { lopDays: 2 }, // Mocked LOP from Attendance
                            rulesVersion: 1
                        }
                    }
                });
            } else {
                this.logger.warn(\`Using existing snapshot for deterministic run (Employee \${assign.employeeId})\`);
            }

            // Execute Calc
            await this.calcService.calculateEmployeePayroll(ctx, runId, assign.employeeId, currencyId);
        }

        await this.prisma.payPayrollRun.update({
            where: { id: runId },
            data: { status: 'Approved' } // Auto-approve for test
        });
        
        await this.eventBus.publish(ctx, 'PayrollCalculationCompleted', { runId });
    }

    async lockPayroll(ctx: any, runId: string): Promise<void> {
        this.logger.log(\`Locking payroll run \${runId}\`);
        await this.prisma.payPayrollRun.update({
            where: { id: runId },
            data: { status: 'Locked' }
        });
        await this.eventBus.publish(ctx, 'PayrollLocked', { runId });
    }
}
`;
fs.writeFileSync(path.join(baseDir, 'services/payroll-run.service.ts'), runService);

// 4. Payslip Service
const payslipService = `
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PayslipService {
    private readonly logger = new Logger(PayslipService.name);
    
    constructor(private prisma: PrismaService) {}

    async generatePayslips(ctx: any, runId: string): Promise<void> {
        this.logger.log(\`Generating payslips for run \${runId}\`);
        const calculations = await this.prisma.payPayrollCalculation.findMany({
            where: { payrollRunId: runId }
        });

        for (const calc of calculations) {
            await this.prisma.payPayslip.create({
                data: {
                    tenantId: ctx.tenantId,
                    calculationId: calc.id,
                    versionNumber: 1,
                    status: 'Published'
                }
            });
        }
    }
}
`;
fs.writeFileSync(path.join(baseDir, 'services/payslip.service.ts'), payslipService);

// 5. Journal Service (Adapter Pattern)
const journalService = `
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class JournalService {
    private readonly logger = new Logger(JournalService.name);

    constructor(private prisma: PrismaService) {}

    async exportToErp(ctx: any, runId: string, erpProvider: 'SAP' | 'Oracle' | 'Tally'): Promise<any> {
        this.logger.log(\`Exporting Payroll \${runId} to ERP: \${erpProvider}\`);
        // Mock abstract export logic
        return {
            provider: erpProvider,
            totalDebit: 150000,
            totalCredit: 150000,
            status: 'Exported'
        };
    }
}
`;
fs.writeFileSync(path.join(baseDir, 'services/journal.service.ts'), journalService);

// 6. Module Registration
const moduleContent = `
import { Module } from '@nestjs/common';
import { PayrollFormulaEngine } from './services/payroll-formula.engine';
import { PayrollCalculationService } from './services/payroll-calculation.service';
import { PayrollRunService } from './services/payroll-run.service';
import { PayslipService } from './services/payslip.service';
import { JournalService } from './services/journal.service';
import { CommonModule } from '../../common/common.module';

@Module({
    imports: [CommonModule],
    providers: [
        PayrollFormulaEngine,
        PayrollCalculationService,
        PayrollRunService,
        PayslipService,
        JournalService
    ],
    exports: [PayrollRunService, JournalService, PayslipService]
})
export class PayrollModule {}
`;
fs.writeFileSync(path.join(baseDir, 'payroll.module.ts'), moduleContent);

console.log('Phase 5.6 Payroll Domain Scaffolded.');
