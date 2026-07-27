import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class SoftwareLicenseService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    allocateSeat(ctx: PlatformContext, poolId: string, employeeId: string): Promise<{
        id: string;
        employeeId: string | null;
        tenantId: string;
        status: string;
        assignedAt: Date;
        assetId: string | null;
        releasedAt: Date | null;
        poolId: string;
    }>;
}
//# sourceMappingURL=software-license.service.d.ts.map