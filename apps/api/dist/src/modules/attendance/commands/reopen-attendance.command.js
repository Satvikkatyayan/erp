"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReopenAttendanceCommand = void 0;
class ReopenAttendanceCommand {
    constructor(musterId, actorId, actorRoles, correlationId, reason) {
        this.musterId = musterId;
        this.actorId = actorId;
        this.actorRoles = actorRoles;
        this.correlationId = correlationId;
        this.reason = reason;
    }
}
exports.ReopenAttendanceCommand = ReopenAttendanceCommand;
//# sourceMappingURL=reopen-attendance.command.js.map