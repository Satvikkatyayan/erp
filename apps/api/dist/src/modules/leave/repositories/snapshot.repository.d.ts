import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class LeaveSnapshotRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSnapshot(tenantId: string, leaveRequestId: string, snapshotData: any, tx?: any): Promise<any>;
    getSnapshotHistory(tenantId: string, leaveRequestId: string): Promise<any[]>;
}
//# sourceMappingURL=snapshot.repository.d.ts.map