"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleCancelledEvent = void 0;
class ScheduleCancelledEvent {
    constructor(correlationId, scheduleId, tenantId, reason) {
        this.correlationId = correlationId;
        this.scheduleId = scheduleId;
        this.tenantId = tenantId;
        this.reason = reason;
        Object.freeze(this);
    }
}
exports.ScheduleCancelledEvent = ScheduleCancelledEvent;
//# sourceMappingURL=schedule-cancelled.event.js.map