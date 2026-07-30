import { PayrollFormulaEngine } from './payroll-formula.engine';
import { PayPayrollCalculationRepository } from '../repositories/payroll-calculation.repository';
import { PayCalculationStepRepository } from '../repositories/calculation-step.repository';
import { PayPayrollSnapshotRepository } from '../repositories/payroll-snapshot.repository';
import { PayslipService } from './payslip.service';
import { EventBusService } from '../../../core/events/event-bus.service';
export declare class PayrollCalculationService {
    private readonly snapshotRepo;
    private readonly calcRepo;
    private readonly stepRepo;
    private readonly formulaEngine;
    private readonly payslipService;
    private readonly eventBus;
    private readonly logger;
    constructor(snapshotRepo: PayPayrollSnapshotRepository, calcRepo: PayPayrollCalculationRepository, stepRepo: PayCalculationStepRepository, formulaEngine: PayrollFormulaEngine, payslipService: PayslipService, eventBus: EventBusService);
    calculateEmployeePayroll(ctx: any, runId: string, employeeId: string, currencyId: string, snapshotId: string, tx: any): Promise<string>;
}
//# sourceMappingURL=payroll-calculation.service.d.ts.map