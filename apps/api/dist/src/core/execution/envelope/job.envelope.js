"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobEnvelope = void 0;
class JobEnvelope {
    constructor(jobId, worker, executionContext, payload) {
        this.jobId = jobId;
        this.worker = worker;
        this.executionContext = executionContext;
        this.payload = payload;
    }
}
exports.JobEnvelope = JobEnvelope;
//# sourceMappingURL=job.envelope.js.map