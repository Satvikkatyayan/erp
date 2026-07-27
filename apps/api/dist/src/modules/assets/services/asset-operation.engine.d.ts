import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { AssetTimelineService } from './asset-timeline.service';
import { AssignmentService } from './assignment.service';
export declare class AssetOperationEngine {
    private readonly prisma;
    private readonly timeline;
    private readonly assignmentService;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, timeline: AssetTimelineService, assignmentService: AssignmentService, sdk: PlatformSDK);
    executeTransition(ctx: PlatformContext, assetId: string, operation: 'Assign' | 'Return' | 'Transfer' | 'Maintenance' | 'Dispose', payload: any, actorId: string): Promise<any>;
    createSnapshot(ctx: PlatformContext, assetId: string, snapshotType: string, resultData: any): Promise<void>;
}
//# sourceMappingURL=asset-operation.engine.d.ts.map