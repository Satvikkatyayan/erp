import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { ExitOperationEngine } from '../engines/exit-operation.engine';
import { ExitTimelineService } from './exit-timeline.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class ExitLifecycleService {
    private readonly prisma;
    private readonly engine;
    private readonly timeline;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, engine: ExitOperationEngine, timeline: ExitTimelineService, sdk: PlatformSDK);
    startExit(ctx: PlatformContext, employeeId: string, policyId: string, reasonId: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        workflowId: string | null;
        submittedAt: Date | null;
        requestedLwd: Date;
        approvedLwd: Date | null;
        policyId: string;
        reasonId: string;
    }>;
    archiveEmployee(ctx: PlatformContext, requestId: string): Promise<void>;
}
//# sourceMappingURL=exit-lifecycle.service.d.ts.map