import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class AssetRecoveryService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    initiateRecovery(ctx: PlatformContext, assetId: string, employeeId: string, reason: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        status: string;
        remarks: string | null;
        workflowStepId: string | null;
        assetId: string;
        initiatedAt: Date;
        initiatedReason: string;
        recoveredAt: Date | null;
        recoveredBy: string | null;
    }>;
}
//# sourceMappingURL=asset-recovery.service.d.ts.map