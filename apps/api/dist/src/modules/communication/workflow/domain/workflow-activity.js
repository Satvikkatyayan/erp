"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowActivity = void 0;
class WorkflowActivity {
    constructor(activityId, workflowId, activityType, payload) {
        this.activityId = activityId;
        this.workflowId = workflowId;
        this.activityType = activityType;
        this.payload = payload;
        Object.freeze(this);
    }
}
exports.WorkflowActivity = WorkflowActivity;
//# sourceMappingURL=workflow-activity.js.map