"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalAssignmentCancelledEvent = void 0;
class ApprovalAssignmentCancelledEvent {
    constructor(correlationId, approvalId, approvalAssignmentId, reason, tenantId) {
        this.correlationId = correlationId;
        this.approvalId = approvalId;
        this.approvalAssignmentId = approvalAssignmentId;
        this.reason = reason;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalAssignmentCancelledEvent = ApprovalAssignmentCancelledEvent;
//# sourceMappingURL=approval-assignment-cancelled.event.js.map