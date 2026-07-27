"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryExceededException = void 0;
const worker_exception_1 = require("./worker.exception");
class RetryExceededException extends worker_exception_1.WorkerException {
    constructor(workerName, message, originalError) {
        super(workerName, message, originalError);
        this.name = 'RetryExceededException';
    }
}
exports.RetryExceededException = RetryExceededException;
//# sourceMappingURL=retry.exceeded.js.map