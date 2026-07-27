import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { DistributedLockService } from '../../cache/distributed-lock.service';
export declare abstract class WorkerBase extends WorkerHost {
    protected readonly lockService: DistributedLockService;
    protected abstract readonly logger: Logger;
    constructor(lockService: DistributedLockService);
    process(job: Job): Promise<any>;
    abstract handleJob(job: Job): Promise<void>;
}
//# sourceMappingURL=worker-base.class.d.ts.map