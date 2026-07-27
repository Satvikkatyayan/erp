import { PrismaService } from '../../../common/prisma/prisma.service';
import { PayrollFormulaEngine } from './payroll-formula.engine';
export declare class PayrollCalculationService {
    private prisma;
    private formulaEngine;
    private readonly logger;
    constructor(prisma: PrismaService, formulaEngine: PayrollFormulaEngine);
    calculateEmployeePayroll(ctx: any, runId: string, employeeId: string, currencyId: string): Promise<string>;
}
//# sourceMappingURL=payroll-calculation.service.d.ts.map