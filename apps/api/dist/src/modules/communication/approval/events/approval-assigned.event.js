"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalAssignedEvent = void 0;
class ApprovalAssignedEvent {
    constructor(correlationId, approvalId, approvalAssignmentId, tenantId) {
        this.correlationId = correlationId;
        this.approvalId = approvalId;
        this.approvalAssignmentId = approvalAssignmentId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalAssignedEvent = ApprovalAssignedEvent;
//# sourceMappingURL=approval-assigned.event.js.map