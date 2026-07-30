"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalCancelledEvent = void 0;
class ApprovalCancelledEvent {
    constructor(correlationId, approvalId, reason, tenantId) {
        this.correlationId = correlationId;
        this.approvalId = approvalId;
        this.reason = reason;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalCancelledEvent = ApprovalCancelledEvent;
//# sourceMappingURL=approval-cancelled.event.js.map