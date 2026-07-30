"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryScheduledEvent = void 0;
class RetryScheduledEvent {
    constructor(correlationId, attempt, delayMs) {
        this.correlationId = correlationId;
        this.attempt = attempt;
        this.delayMs = delayMs;
    }
}
exports.RetryScheduledEvent = RetryScheduledEvent;
//# sourceMappingURL=retry-scheduled.event.js.map