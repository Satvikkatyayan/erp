import { PrismaService } from '../../../common/prisma/prisma.service';
import { PayrollCalculationService } from './payroll-calculation.service';
export declare class PayrollRunService {
    private prisma;
    private calcService;
    private readonly logger;
    constructor(prisma: PrismaService, calcService: PayrollCalculationService);
    captureSnapshotAndCalculate(ctx: any, runId: string, currencyId: string): Promise<void>;
    lockPayroll(ctx: any, runId: string): Promise<void>;
}
//# sourceMappingURL=payroll-run.service.d.ts.map