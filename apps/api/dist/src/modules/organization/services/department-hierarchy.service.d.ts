import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class DepartmentHierarchyService {
    private readonly prisma;
    private readonly platform;
    private readonly logger;
    constructor(prisma: PrismaService, platform: PlatformSDK);
    detectCycle(tenantId: string, departmentId: string, newParentId: string): Promise<boolean>;
    moveDepartment(ctx: PlatformContext, departmentId: string, newParentId: string): Promise<any>;
}
//# sourceMappingURL=department-hierarchy.service.d.ts.map