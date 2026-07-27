"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceLifecycleEvent = void 0;
const uuid_1 = require("uuid");
class AttendanceLifecycleEvent {
    constructor(eventName, correlationId, payload) {
        this.eventName = eventName;
        this.correlationId = correlationId;
        this.payload = payload;
        this.eventId = (0, uuid_1.v4)();
        this.version = 1;
        this.timestamp = new Date();
    }
}
exports.AttendanceLifecycleEvent = AttendanceLifecycleEvent;
//# sourceMappingURL=attendance-lifecycle.events.js.map