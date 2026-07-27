import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class ReviewTemplateService {
    private readonly prisma;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    createTemplate(ctx: any, data: {
        name: string;
        description?: string;
    }): Promise<any>;
    createVersion(ctx: any, templateId: string, data: {
        sectionsConfig: any;
        effectiveFrom?: Date;
    }): Promise<any>;
    publishVersion(ctx: any, versionId: string): Promise<any>;
    assignToReview(ctx: any, reviewId: string, templateVersionId: string): Promise<void>;
    getActiveVersion(tenantId: string, templateId: string): Promise<any>;
}
//# sourceMappingURL=review-template.service.d.ts.map