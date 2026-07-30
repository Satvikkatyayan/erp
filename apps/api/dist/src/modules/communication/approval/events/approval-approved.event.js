"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalApprovedEvent = void 0;
class ApprovalApprovedEvent {
    constructor(correlationId, approvalId, tenantId) {
        this.correlationId = correlationId;
        this.approvalId = approvalId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ApprovalApprovedEvent = ApprovalApprovedEvent;
//# sourceMappingURL=approval-approved.event.js.map