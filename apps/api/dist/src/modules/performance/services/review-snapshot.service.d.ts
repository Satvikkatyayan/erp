import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class ReviewSnapshotService {
    private readonly prisma;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    captureSnapshot(ctx: any, data: {
        cycleId: string;
        employeeId: string;
        reviewId: string;
        snapshotType?: string;
    }): Promise<any>;
}
//# sourceMappingURL=review-snapshot.service.d.ts.map