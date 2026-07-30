import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class OrganizationQueryService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getDepartments(ctx: PlatformContext): Promise<{
        name: string;
        id: string;
        tenantId: string;
        status: string;
        effectiveFrom: Date;
        effectiveTo: Date | null;
        costCenterId: string | null;
        code: string;
        managerId: string | null;
        divisionId: string | null;
        parentId: string | null;
    }[]>;
}
//# sourceMappingURL=organization-query.service.d.ts.map