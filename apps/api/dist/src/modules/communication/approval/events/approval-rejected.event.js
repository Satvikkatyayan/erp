"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalRejectedEvent = void 0;
class ApprovalRejectedEvent {
    constructor(correlationId, approvalId, reason, tenantId) {
        this.correlationId = correlationId;
        this.approvalId = approvalId;
        this.reason = reason;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalRejectedEvent = ApprovalRejectedEvent;
//# sourceMappingURL=approval-rejected.event.js.map