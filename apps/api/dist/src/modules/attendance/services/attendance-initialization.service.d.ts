import { PrismaService } from '../../../common/prisma/prisma.service';
import { SnapshotEmployeeData } from './attendance-snapshot.service';
export declare class AttendanceInitializationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    initializeAggregate(musterId: string, snapshotData: SnapshotEmployeeData[], shiftId: string | null, prismaTx?: any): Promise<any>;
}
//# sourceMappingURL=attendance-initialization.service.d.ts.map