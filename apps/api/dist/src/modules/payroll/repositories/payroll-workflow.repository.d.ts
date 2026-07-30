import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollWorkflowRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findActiveWorkflow(tenantId: string, tx?: any): Promise<any>;
}
//# sourceMappingURL=payroll-workflow.repository.d.ts.map