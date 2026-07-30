"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowCompletedEvent = void 0;
class WorkflowCompletedEvent {
    constructor(correlationId, workflowId, tenantId) {
        this.correlationId = correlationId;
        this.workflowId = workflowId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.WorkflowCompletedEvent = WorkflowCompletedEvent;
//# sourceMappingURL=workflow-completed.event.js.map