import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EssEventPublisher } from '../events/ess-event.publisher';
export declare class EmployeeDocumentService {
    private readonly prisma;
    private readonly publisher;
    private readonly logger;
    constructor(prisma: PrismaService, publisher: EssEventPublisher);
    viewDocument(ctx: PlatformContext, documentId: string, ipAddress?: string, userAgent?: string): Promise<{
        success: boolean;
    }>;
    downloadDocument(ctx: PlatformContext, documentId: string, ipAddress?: string, userAgent?: string): Promise<{
        success: boolean;
        downloadUrl: string;
    }>;
    acknowledgePolicy(ctx: PlatformContext, documentId: string | null, policyName: string | null, ipAddress?: string, userAgent?: string): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=employee-document.service.d.ts.map