"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerException = void 0;
class WorkerException extends Error {
    constructor(workerName, message, originalError) {
        super(message);
        this.workerName = workerName;
        this.originalError = originalError;
        this.name = 'WorkerException';
    }
}
exports.WorkerException = WorkerException;
//# sourceMappingURL=worker.exception.js.map