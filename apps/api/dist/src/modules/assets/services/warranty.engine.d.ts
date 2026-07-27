import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class WarrantyEngine {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    addWarrantyContract(ctx: PlatformContext, assetId: string, contractType: string, effectiveFrom: Date, effectiveTo: Date): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        status: string;
        effectiveFrom: Date;
        effectiveTo: Date;
        assetId: string;
        vendorId: string | null;
        contractType: string;
        contractNumber: string | null;
        terms: string | null;
        coverageDetails: import("@prisma/client/runtime/library").JsonValue | null;
        cost: number | null;
    }>;
}
//# sourceMappingURL=warranty.engine.d.ts.map