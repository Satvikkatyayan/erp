"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryExhaustedEvent = void 0;
class RetryExhaustedEvent {
    constructor(correlationId, attemptsMade, finalErrorCode) {
        this.correlationId = correlationId;
        this.attemptsMade = attemptsMade;
        this.finalErrorCode = finalErrorCode;
    }
}
exports.RetryExhaustedEvent = RetryExhaustedEvent;
//# sourceMappingURL=retry-exhausted.event.js.map