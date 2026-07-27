"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteReviewCommand = void 0;
class CompleteReviewCommand {
    constructor(musterId, actorId, actorRoles, decision, remarks, correlationId) {
        this.musterId = musterId;
        this.actorId = actorId;
        this.actorRoles = actorRoles;
        this.decision = decision;
        this.remarks = remarks;
        this.correlationId = correlationId;
    }
}
exports.CompleteReviewCommand = CompleteReviewCommand;
//# sourceMappingURL=complete-review.command.js.map