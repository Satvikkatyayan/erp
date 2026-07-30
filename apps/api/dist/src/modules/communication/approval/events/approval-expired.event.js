"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalExpiredEvent = void 0;
class ApprovalExpiredEvent {
    constructor(correlationId, approvalId, tenantId) {
        this.correlationId = correlationId;
        this.approvalId = approvalId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalExpiredEvent = ApprovalExpiredEvent;
//# sourceMappingURL=approval-expired.event.js.map