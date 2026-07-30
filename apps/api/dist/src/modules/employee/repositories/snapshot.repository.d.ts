import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmpEmployeeSnapshotRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSnapshot(tenantId: string, employeeId: string, snapshotData: any, tx?: any): Promise<any>;
    getLatestSnapshot(tenantId: string, employeeId: string): Promise<any>;
}
//# sourceMappingURL=snapshot.repository.d.ts.map