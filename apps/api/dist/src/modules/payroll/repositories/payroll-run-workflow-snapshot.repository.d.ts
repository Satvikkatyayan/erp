import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollRunWorkflowSnapshotRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    save(data: any, tx?: any): Promise<any>;
    findByRunId(payrollRunId: string, tx?: any): Promise<any>;
}
//# sourceMappingURL=payroll-run-workflow-snapshot.repository.d.ts.map