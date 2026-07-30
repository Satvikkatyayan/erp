import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class BackgroundVerificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    initiate(ctx: PlatformContext, applicationId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        applicationId: string;
        notes: string | null;
        vendorName: string;
        reportUrl: string | null;
    }>;
}
//# sourceMappingURL=background-verification.service.d.ts.map