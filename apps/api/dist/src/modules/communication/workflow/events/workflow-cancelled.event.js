"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowCancelledEvent = void 0;
class WorkflowCancelledEvent {
    constructor(correlationId, workflowId, reason, tenantId) {
        this.correlationId = correlationId;
        this.workflowId = workflowId;
        this.reason = reason;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.WorkflowCancelledEvent = WorkflowCancelledEvent;
//# sourceMappingURL=workflow-cancelled.event.js.map