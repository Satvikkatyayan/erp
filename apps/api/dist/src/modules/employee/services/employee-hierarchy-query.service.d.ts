import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class EmployeeHierarchyQueryService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getDirectReports(ctx: PlatformContext, managerId: string): Promise<{
        id: string;
        userId: string | null;
        tenantId: string;
        organizationId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        employeeNumber: string;
    }[]>;
    getIndirectReports(ctx: PlatformContext, managerId: string, maxDepth?: number): Promise<any[]>;
    getTeamScopeIds(ctx: PlatformContext, managerId: string, includeIndirect?: boolean, maxDepth?: number): Promise<string[]>;
}
//# sourceMappingURL=employee-hierarchy-query.service.d.ts.map