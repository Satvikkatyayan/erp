import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ManagerPreferenceService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    updatePreferences(ctx: PlatformContext, payload: any): Promise<{
        language: string;
        id: string;
        timezone: string;
        tenantId: string;
        theme: string;
        managerId: string;
    }>;
}
//# sourceMappingURL=manager-preference.service.d.ts.map