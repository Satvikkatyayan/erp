"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartReviewCommand = void 0;
class StartReviewCommand {
    constructor(musterId, actorId, actorRoles, correlationId, reason) {
        this.musterId = musterId;
        this.actorId = actorId;
        this.actorRoles = actorRoles;
        this.correlationId = correlationId;
        this.reason = reason;
    }
}
exports.StartReviewCommand = StartReviewCommand;
//# sourceMappingURL=start-review.command.js.map