"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleCreatedEvent = void 0;
class ScheduleCreatedEvent {
    constructor(correlationId, scheduleId, tenantId, releaseAt) {
        this.correlationId = correlationId;
        this.scheduleId = scheduleId;
        this.tenantId = tenantId;
        this.releaseAt = releaseAt;
        Object.freeze(this);
    }
}
exports.ScheduleCreatedEvent = ScheduleCreatedEvent;
//# sourceMappingURL=schedule-created.event.js.map