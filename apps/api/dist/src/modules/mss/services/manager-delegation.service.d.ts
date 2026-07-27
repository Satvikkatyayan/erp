import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ManagerDelegationService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createDelegation(ctx: PlatformContext, payload: any): Promise<{
        id: string;
        tenantId: string;
        status: string;
        reason: string | null;
        effectiveFrom: Date;
        effectiveTo: Date;
        managerId: string;
        scope: string;
        delegatedToId: string;
    }>;
}
//# sourceMappingURL=manager-delegation.service.d.ts.map