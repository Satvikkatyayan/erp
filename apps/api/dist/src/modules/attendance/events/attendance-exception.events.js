"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceHealthEvent = exports.AttendanceExceptionEvent = void 0;
const uuid_1 = require("uuid");
class AttendanceExceptionEvent {
    constructor(eventName, correlationId, payload) {
        this.eventName = eventName;
        this.correlationId = correlationId;
        this.payload = payload;
        this.eventId = (0, uuid_1.v4)();
        this.version = 1;
        this.timestamp = new Date();
    }
}
exports.AttendanceExceptionEvent = AttendanceExceptionEvent;
class AttendanceHealthEvent {
    constructor(eventName, correlationId, payload) {
        this.eventName = eventName;
        this.correlationId = correlationId;
        this.payload = payload;
        this.eventId = (0, uuid_1.v4)();
        this.version = 1;
        this.timestamp = new Date();
    }
}
exports.AttendanceHealthEvent = AttendanceHealthEvent;
//# sourceMappingURL=attendance-exception.events.js.map