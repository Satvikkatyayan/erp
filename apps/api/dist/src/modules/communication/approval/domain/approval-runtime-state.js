"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalRuntimeState = void 0;
const approval_state_enum_1 = require("./approval-state.enum");
class ApprovalRuntimeState {
    constructor(approvalId, initialState = approval_state_enum_1.ApprovalState.CREATED) {
        this.approvalId = approvalId;
        this._state = initialState;
    }
    get state() {
        return this._state;
    }
    transitionTo(newState) {
        this._state = newState;
    }
}
exports.ApprovalRuntimeState = ApprovalRuntimeState;
//# sourceMappingURL=approval-runtime-state.js.map