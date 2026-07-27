export interface ApprovalWorkflow {
    levels: any[];
    isComplete: boolean;
}
export declare class ApprovalEngineService {
    getApprovalWorkflow(entityType: string, entityId: string): Promise<ApprovalWorkflow>;
}
//# sourceMappingURL=approval-engine.service.d.ts.map