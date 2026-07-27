"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceReviewEvent = void 0;
const uuid_1 = require("uuid");
class AttendanceReviewEvent {
    constructor(eventName, correlationId, payload) {
        this.eventName = eventName;
        this.correlationId = correlationId;
        this.payload = payload;
        this.eventId = (0, uuid_1.v4)();
        this.version = 1;
        this.timestamp = new Date();
    }
}
exports.AttendanceReviewEvent = AttendanceReviewEvent;
//# sourceMappingURL=attendance-review.events.js.map