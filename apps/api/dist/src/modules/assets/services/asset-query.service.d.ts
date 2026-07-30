import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class AssetQueryService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getAssignedAssets(ctx: PlatformContext): Promise<({
        asset: {
            category: {
                name: string;
                id: string;
                tenantId: string;
                organizationId: string;
                description: string | null;
                isActive: boolean;
                code: string;
                assetType: string;
            };
        } & {
            name: string;
            id: string;
            tenantId: string;
            organizationId: string;
            createdAt: Date;
            status: string;
            description: string | null;
            categoryId: string;
            assetType: string;
            subCategoryId: string | null;
            locationId: string | null;
            vendorId: string | null;
            condition: string;
        };
    } & {
        id: string;
        employeeId: string;
        tenantId: string;
        status: string;
        remarks: string | null;
        departmentId: string | null;
        assignedAt: Date;
        assetId: string;
        assignedBy: string;
        expectedReturnDate: Date | null;
        returnedAt: Date | null;
        returnCondition: string | null;
    })[]>;
}
//# sourceMappingURL=asset-query.service.d.ts.map