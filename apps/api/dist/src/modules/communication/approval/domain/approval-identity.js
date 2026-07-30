"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalIdentity = void 0;
class ApprovalIdentity {
    constructor(approvalId, workflowId, workflowActivityId, correlationId, tenantId) {
        this.approvalId = approvalId;
        this.workflowId = workflowId;
        this.workflowActivityId = workflowActivityId;
        this.correlationId = correlationId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalIdentity = ApprovalIdentity;
//# sourceMappingURL=approval-identity.js.map