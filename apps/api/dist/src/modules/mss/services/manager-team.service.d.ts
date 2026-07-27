import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ManagerTeamService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getDirectory(ctx: PlatformContext, scopeIds: string[]): Promise<{
        id: string;
        name: string;
        position: string;
        status: string;
    }[]>;
}
//# sourceMappingURL=manager-team.service.d.ts.map