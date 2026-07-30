"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowIdentity = void 0;
class WorkflowIdentity {
    constructor(workflowId, correlationId, tenantId) {
        this.workflowId = workflowId;
        this.correlationId = correlationId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.WorkflowIdentity = WorkflowIdentity;
//# sourceMappingURL=workflow-identity.js.map