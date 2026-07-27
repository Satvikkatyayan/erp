import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class CandidateService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createCandidate(ctx: PlatformContext, payload: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: string | null;
        updatedBy: string | null;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        sourceId: string | null;
        agencyId: string | null;
    }>;
}
//# sourceMappingURL=candidate.service.d.ts.map