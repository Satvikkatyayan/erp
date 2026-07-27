import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ApprovalFacade } from '../facades/approval.facade';
export declare class ManagerApprovalService {
    private readonly prisma;
    private readonly approvalFacade;
    private readonly logger;
    constructor(prisma: PrismaService, approvalFacade: ApprovalFacade);
    getPendingApprovals(ctx: PlatformContext): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        workflowId: string;
        priority: string;
        managerId: string;
        sourceModule: string;
        slaDueDate: Date | null;
        submittedById: string;
        currentStep: string | null;
        payloadSummary: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    processApproval(ctx: PlatformContext, approvalId: string, action: 'APPROVE' | 'REJECT', reason?: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        workflowId: string;
        priority: string;
        managerId: string;
        sourceModule: string;
        slaDueDate: Date | null;
        submittedById: string;
        currentStep: string | null;
        payloadSummary: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
//# sourceMappingURL=manager-approval.service.d.ts.map