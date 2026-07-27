import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class MaintenanceService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    scheduleMaintenance(ctx: PlatformContext, assetId: string, title: string, frequency: string, nextScheduledAt: Date): Promise<{
        id: string;
        tenantId: string;
        description: string | null;
        title: string;
        isActive: boolean;
        assetId: string;
        frequency: string;
        nextScheduledAt: Date;
    }>;
}
//# sourceMappingURL=maintenance.service.d.ts.map