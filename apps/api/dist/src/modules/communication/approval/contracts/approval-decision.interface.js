"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalDecisionResult = void 0;
class ApprovalDecisionResult {
    constructor(requiresApproval, initialApprovers = []) {
        this.requiresApproval = requiresApproval;
        this.initialApprovers = initialApprovers;
        Object.freeze(this);
    }
}
exports.ApprovalDecisionResult = ApprovalDecisionResult;
//# sourceMappingURL=approval-decision.interface.js.map