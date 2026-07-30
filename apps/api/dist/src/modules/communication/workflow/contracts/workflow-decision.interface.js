"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowDecisionResult = void 0;
class WorkflowDecisionResult {
    constructor(nextActivityType, shouldPause, shouldTerminate) {
        this.nextActivityType = nextActivityType;
        this.shouldPause = shouldPause;
        this.shouldTerminate = shouldTerminate;
        Object.freeze(this);
    }
}
exports.WorkflowDecisionResult = WorkflowDecisionResult;
//# sourceMappingURL=workflow-decision.interface.js.map