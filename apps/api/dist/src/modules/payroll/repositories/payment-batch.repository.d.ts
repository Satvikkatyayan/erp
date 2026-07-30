import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPaymentBatchRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createBatch(tenantId: string, payrollRunId: string, versionNumber: number, tx?: any): Promise<any>;
    createInstructions(instructions: any[], tx?: any): Promise<void>;
    getBatch(tenantId: string, payrollRunId: string): Promise<any | null>;
    exists(tenantId: string, payrollRunId: string): Promise<boolean>;
}
//# sourceMappingURL=payment-batch.repository.d.ts.map