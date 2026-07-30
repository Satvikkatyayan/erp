import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayArrearRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getArrearsForEmployee(tenantId: string, employeeId: string): Promise<any[]>;
    exists(tenantId: string, employeeId: string, previousRunId: string): Promise<boolean>;
}
//# sourceMappingURL=arrear.repository.d.ts.map