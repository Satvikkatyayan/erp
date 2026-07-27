"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerFailure = void 0;
class WorkerFailure {
    constructor(errorId, workerName, executionContext, reason, failedAt, stackTrace) {
        this.errorId = errorId;
        this.workerName = workerName;
        this.executionContext = executionContext;
        this.reason = reason;
        this.failedAt = failedAt;
        this.stackTrace = stackTrace;
    }
}
exports.WorkerFailure = WorkerFailure;
//# sourceMappingURL=worker.failure.js.map