"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalRequestedEvent = void 0;
class ApprovalRequestedEvent {
    constructor(correlationId, approvalId, workflowId, workflowActivityId, tenantId) {
        this.correlationId = correlationId;
        this.approvalId = approvalId;
        this.workflowId = workflowId;
        this.workflowActivityId = workflowActivityId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalRequestedEvent = ApprovalRequestedEvent;
//# sourceMappingURL=approval-requested.event.js.map