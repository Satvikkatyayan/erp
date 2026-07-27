"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadLetterCandidate = void 0;
class DeadLetterCandidate {
    constructor(jobId, workerName, executionContext, payload, lastError, failedAt) {
        this.jobId = jobId;
        this.workerName = workerName;
        this.executionContext = executionContext;
        this.payload = payload;
        this.lastError = lastError;
        this.failedAt = failedAt;
    }
}
exports.DeadLetterCandidate = DeadLetterCandidate;
//# sourceMappingURL=dead-letter.candidate.js.map