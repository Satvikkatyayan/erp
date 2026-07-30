"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowResumedEvent = void 0;
class WorkflowResumedEvent {
    constructor(correlationId, workflowId, tenantId) {
        this.correlationId = correlationId;
        this.workflowId = workflowId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.WorkflowResumedEvent = WorkflowResumedEvent;
//# sourceMappingURL=workflow-resumed.event.js.map