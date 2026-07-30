"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowPausedEvent = void 0;
class WorkflowPausedEvent {
    constructor(correlationId, workflowId, reason, tenantId) {
        this.correlationId = correlationId;
        this.workflowId = workflowId;
        this.reason = reason;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.WorkflowPausedEvent = WorkflowPausedEvent;
//# sourceMappingURL=workflow-paused.event.js.map