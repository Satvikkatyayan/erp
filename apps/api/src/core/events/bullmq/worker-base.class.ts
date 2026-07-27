import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { DistributedLockService } from '../../cache/distributed-lock.service';

export abstract class WorkerBase extends WorkerHost {
  protected abstract readonly logger: Logger;
  
  constructor(protected readonly lockService: DistributedLockService) {
    super();
  }

  // Idempotency constraint ensures the same event ID isn't processed multiple times
  // successfully if retried or duplicated.
  async process(job: Job): Promise<any> {
    const lockKey = `worker:lock:${job.name}:${job.id}`;
    const acquired = await this.lockService.acquire(lockKey, 30000); // 30 sec TTL
    
    if (!acquired) {
      this.logger.warn(`Job ${job.id} is currently being processed by another worker.`);
      throw new Error('Lock acquisition failed. Job will be retried.');
    }

    try {
      this.logger.log(`Starting job ${job.id} for event ${job.name}`);
      await this.handleJob(job);
      this.logger.log(`Finished job ${job.id}`);
    } catch (error) {
      this.logger.error(`Failed job ${job.id}`, error instanceof Error ? error.stack : String(error));
      // Dead Letter Queue routing is handled by BullMQ configuration automatically
      // after max attempts are exhausted.
      throw error; 
    } finally {
      await this.lockService.release(lockKey);
    }
  }

  abstract handleJob(job: Job): Promise<void>;
}