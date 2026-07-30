"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowStartedEvent = void 0;
class WorkflowStartedEvent {
    constructor(correlationId, workflowId, tenantId) {
        this.correlationId = correlationId;
        this.workflowId = workflowId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.WorkflowStartedEvent = WorkflowStartedEvent;
//# sourceMappingURL=workflow-started.event.js.map