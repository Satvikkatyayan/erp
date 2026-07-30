"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowActivitySelectedEvent = void 0;
class WorkflowActivitySelectedEvent {
    constructor(correlationId, workflowId, activityId, activityType, tenantId) {
        this.correlationId = correlationId;
        this.workflowId = workflowId;
        this.activityId = activityId;
        this.activityType = activityType;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.WorkflowActivitySelectedEvent = WorkflowActivitySelectedEvent;
//# sourceMappingURL=workflow-activity-selected.event.js.map