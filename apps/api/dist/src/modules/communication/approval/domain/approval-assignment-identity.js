"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalAssignmentIdentity = void 0;
class ApprovalAssignmentIdentity {
    constructor(approvalAssignmentId, approvalId, workflowId, workflowActivityId, correlationId, tenantId) {
        this.approvalAssignmentId = approvalAssignmentId;
        this.approvalId = approvalId;
        this.workflowId = workflowId;
        this.workflowActivityId = workflowActivityId;
        this.correlationId = correlationId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalAssignmentIdentity = ApprovalAssignmentIdentity;
//# sourceMappingURL=approval-assignment-identity.js.map