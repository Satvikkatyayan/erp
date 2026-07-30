"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleReleasedEvent = void 0;
class ScheduleReleasedEvent {
    constructor(correlationId, scheduleId, scheduleReleaseId, tenantId) {
        this.correlationId = correlationId;
        this.scheduleId = scheduleId;
        this.scheduleReleaseId = scheduleReleaseId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.ScheduleReleasedEvent = ScheduleReleasedEvent;
//# sourceMappingURL=schedule-released.event.js.map