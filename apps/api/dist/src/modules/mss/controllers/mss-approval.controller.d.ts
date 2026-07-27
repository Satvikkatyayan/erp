import { ManagerApprovalService } from '../services/manager-approval.service';
export declare class MssApprovalController {
    private readonly service;
    constructor(service: ManagerApprovalService);
    getApprovals(req: any): Promise<{
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
    processApproval(req: any, id: string, action: string, body: any): Promise<{
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
//# sourceMappingURL=mss-approval.controller.d.ts.map