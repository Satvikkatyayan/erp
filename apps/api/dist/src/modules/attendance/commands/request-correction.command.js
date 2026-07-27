"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestCorrectionCommand = void 0;
class RequestCorrectionCommand {
    constructor(musterId, actorId, actorRoles, correlationId, reason) {
        this.musterId = musterId;
        this.actorId = actorId;
        this.actorRoles = actorRoles;
        this.correlationId = correlationId;
        this.reason = reason;
    }
}
exports.RequestCorrectionCommand = RequestCorrectionCommand;
//# sourceMappingURL=request-correction.command.js.map