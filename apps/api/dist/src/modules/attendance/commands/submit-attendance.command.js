"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitAttendanceCommand = void 0;
class SubmitAttendanceCommand {
    constructor(musterId, actorId, actorRoles, correlationId, reason) {
        this.musterId = musterId;
        this.actorId = actorId;
        this.actorRoles = actorRoles;
        this.correlationId = correlationId;
        this.reason = reason;
    }
}
exports.SubmitAttendanceCommand = SubmitAttendanceCommand;
//# sourceMappingURL=submit-attendance.command.js.map