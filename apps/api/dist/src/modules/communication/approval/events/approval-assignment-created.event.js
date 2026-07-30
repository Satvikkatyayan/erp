"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalAssignmentCreatedEvent = void 0;
class ApprovalAssignmentCreatedEvent {
    constructor(correlationId, approvalId, approvalAssignmentId, tenantId) {
        this.correlationId = correlationId;
        this.approvalId = approvalId;
        this.approvalAssignmentId = approvalAssignmentId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalAssignmentCreatedEvent = ApprovalAssignmentCreatedEvent;
//# sourceMappingURL=approval-assignment-created.event.js.map