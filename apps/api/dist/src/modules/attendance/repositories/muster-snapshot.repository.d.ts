import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class MusterSnapshotRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        musterId: string;
        siteId: string;
        projectId: string;
        capturedAt: Date;
        snapshotData: import("@prisma/client/runtime/library").JsonValue;
    }>;
}
//# sourceMappingURL=muster-snapshot.repository.d.ts.map