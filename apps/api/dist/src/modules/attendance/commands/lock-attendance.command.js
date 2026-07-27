"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockAttendanceCommand = void 0;
class LockAttendanceCommand {
    constructor(musterId, actorId, actorRoles, correlationId, reason) {
        this.musterId = musterId;
        this.actorId = actorId;
        this.actorRoles = actorRoles;
        this.correlationId = correlationId;
        this.reason = reason;
    }
}
exports.LockAttendanceCommand = LockAttendanceCommand;
//# sourceMappingURL=lock-attendance.command.js.map