"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowRuntimeState = void 0;
const workflow_state_enum_1 = require("./workflow-state.enum");
class WorkflowRuntimeState {
    constructor(workflowId, initialState = workflow_state_enum_1.WorkflowState.CREATED) {
        this.workflowId = workflowId;
        this._activityHistory = [];
        this._state = initialState;
    }
    get state() {
        return this._state;
    }
    get activityHistory() {
        return Object.freeze([...this._activityHistory]);
    }
    transitionTo(newState) {
        this._state = newState;
    }
    addActivity(activity) {
        this._activityHistory.push(activity);
    }
}
exports.WorkflowRuntimeState = WorkflowRuntimeState;
//# sourceMappingURL=workflow-runtime-state.js.map