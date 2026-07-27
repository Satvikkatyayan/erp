import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayslipService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    generatePayslips(ctx: any, runId: string): Promise<void>;
}
//# sourceMappingURL=payslip.service.d.ts.map