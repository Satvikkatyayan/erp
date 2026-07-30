import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollSnapshotRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, tx?: any): Promise<any>;
    save(data: any, tx?: any): Promise<any>;
}
//# sourceMappingURL=payroll-snapshot.repository.d.ts.map