"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerBase = void 0;
const bullmq_1 = require("@nestjs/bullmq");
class WorkerBase extends bullmq_1.WorkerHost {
    constructor(lockService) {
        super();
        this.lockService = lockService;
    }
    async process(job) {
        const lockKey = `worker:lock:${job.name}:${job.id}`;
        const acquired = await this.lockService.acquire(lockKey, 30000);
        if (!acquired) {
            this.logger.warn(`Job ${job.id} is currently being processed by another worker.`);
            throw new Error('Lock acquisition failed. Job will be retried.');
        }
        try {
            this.logger.log(`Starting job ${job.id} for event ${job.name}`);
            await this.handleJob(job);
            this.logger.log(`Finished job ${job.id}`);
        }
        catch (error) {
            this.logger.error(`Failed job ${job.id}`, error instanceof Error ? error.stack : String(error));
            throw error;
        }
        finally {
            await this.lockService.release(lockKey);
        }
    }
}
exports.WorkerBase = WorkerBase;
//# sourceMappingURL=worker-base.class.js.map