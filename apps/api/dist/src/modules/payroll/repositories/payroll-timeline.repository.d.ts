import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollTimelineRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByRunId(payrollRunId: string, tx?: any): Promise<any[]>;
    save(data: any, tx?: any): Promise<any>;
}
//# sourceMappingURL=payroll-timeline.repository.d.ts.map