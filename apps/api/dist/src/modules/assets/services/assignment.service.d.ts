import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class AssignmentService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    assignAsset(ctx: PlatformContext, assetId: string, employeeId: string, assignedBy: string): Promise<{
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
    }>;
    returnAsset(ctx: PlatformContext, assignmentId: string, employeeId: string, condition: string, returnedBy: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        status: string;
        remarks: string | null;
        assignmentId: string;
        assetId: string;
        returnedAt: Date;
        condition: string;
        returnedBy: string;
    }>;
}
//# sourceMappingURL=assignment.service.d.ts.map