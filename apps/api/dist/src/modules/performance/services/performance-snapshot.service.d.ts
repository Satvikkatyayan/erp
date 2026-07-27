import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class PerformanceSnapshotService {
    private readonly prisma;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    captureSnapshot(ctx: any, cycleId: string, employeeId: string): Promise<any>;
    private getManagerData;
    private getPositionData;
}
//# sourceMappingURL=performance-snapshot.service.d.ts.map