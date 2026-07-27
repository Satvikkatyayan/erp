"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceSnapshotCreatedEvent = exports.DailyMusterCreatedEvent = void 0;
const uuid_1 = require("uuid");
class DailyMusterCreatedEvent {
    constructor(correlationId, payload) {
        this.correlationId = correlationId;
        this.payload = payload;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'DailyMusterCreated';
        this.version = 1;
        this.timestamp = new Date();
    }
}
exports.DailyMusterCreatedEvent = DailyMusterCreatedEvent;
class AttendanceSnapshotCreatedEvent {
    constructor(correlationId, payload) {
        this.correlationId = correlationId;
        this.payload = payload;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'AttendanceSnapshotCreated';
        this.version = 1;
        this.timestamp = new Date();
    }
}
exports.AttendanceSnapshotCreatedEvent = AttendanceSnapshotCreatedEvent;
//# sourceMappingURL=attendance.events.js.map