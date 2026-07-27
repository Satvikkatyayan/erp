import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class AssetTimelineService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    logEvent(ctx: PlatformContext, assetId: string, eventType: string, eventData: any, triggeredBy?: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        eventType: string;
        eventData: import("@prisma/client/runtime/library").JsonValue;
        assetId: string;
        triggeredBy: string | null;
    }>;
}
//# sourceMappingURL=asset-timeline.service.d.ts.map