const fs = require('fs');
const path = require('path');

const EVENTS_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\events';
const CACHE_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\cache';

const directories = [
    path.join(EVENTS_DIR, 'interfaces'),
    path.join(EVENTS_DIR, 'constants'),
    path.join(EVENTS_DIR, 'bullmq'),
    CACHE_DIR
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    [path.join(EVENTS_DIR, 'interfaces', 'domain-event.interface.ts')]: `
export interface DomainEvent<T = any> {
  eventId: string;
  eventName: string;
  payload: T;
  timestamp: Date;
  metadata?: Record<string, any>;
  version: number;
}
`,
    [path.join(EVENTS_DIR, 'interfaces', 'event-publisher.interface.ts')]: `
import { DomainEvent } from './domain-event.interface';

export const EVENT_PUBLISHER = 'EVENT_PUBLISHER';

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishBatch(events: DomainEvent[]): Promise<void>;
}
`,
    [path.join(EVENTS_DIR, 'interfaces', 'event-subscriber.interface.ts')]: `
export interface EventSubscriber {
  subscribe(): void;
  unsubscribe(): void;
}
`,
    [path.join(EVENTS_DIR, 'interfaces', 'event-handler.interface.ts')]: `
import { DomainEvent } from './domain-event.interface';

export interface EventHandler {
  handle(event: DomainEvent): Promise<void>;
}
`,
    [path.join(EVENTS_DIR, 'constants', 'queues.constant.ts')]: `
export const QUEUES = {
  WORKFLOW: 'workflow',
  NOTIFICATION: 'notification',
  REPORT: 'report',
  SEARCH: 'search',
  INTEGRATION: 'integration',
  DOCUMENT: 'document',
  AUDIT: 'audit',
  SCHEDULER: 'scheduler',
} as const;

export const EVENT_ROUTING = {
  // Mapping Event Names to Target Queues
  // For example: 'LeaveApproved' -> [QUEUES.WORKFLOW, QUEUES.NOTIFICATION, QUEUES.AUDIT]
  'LeaveApproved': [QUEUES.WORKFLOW, QUEUES.NOTIFICATION, QUEUES.AUDIT],
  'EmployeeCreated': [QUEUES.WORKFLOW, QUEUES.NOTIFICATION, QUEUES.AUDIT, QUEUES.SEARCH],
};
`,
    [path.join(EVENTS_DIR, 'bullmq', 'bullmq-publisher.service.ts')]: `
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EventPublisher } from '../interfaces/event-publisher.interface';
import { DomainEvent } from '../interfaces/domain-event.interface';
import { QUEUES, EVENT_ROUTING } from '../constants/queues.constant';

@Injectable()
export class BullMQPublisher implements EventPublisher {
  constructor(
    @InjectQueue(QUEUES.WORKFLOW) private workflowQueue: Queue,
    @InjectQueue(QUEUES.NOTIFICATION) private notificationQueue: Queue,
    @InjectQueue(QUEUES.REPORT) private reportQueue: Queue,
    @InjectQueue(QUEUES.SEARCH) private searchQueue: Queue,
    @InjectQueue(QUEUES.INTEGRATION) private integrationQueue: Queue,
    @InjectQueue(QUEUES.DOCUMENT) private documentQueue: Queue,
    @InjectQueue(QUEUES.AUDIT) private auditQueue: Queue,
    @InjectQueue(QUEUES.SCHEDULER) private schedulerQueue: Queue,
  ) {}

  private getQueueByName(name: string): Queue {
    const map: Record<string, Queue> = {
      [QUEUES.WORKFLOW]: this.workflowQueue,
      [QUEUES.NOTIFICATION]: this.notificationQueue,
      [QUEUES.REPORT]: this.reportQueue,
      [QUEUES.SEARCH]: this.searchQueue,
      [QUEUES.INTEGRATION]: this.integrationQueue,
      [QUEUES.DOCUMENT]: this.documentQueue,
      [QUEUES.AUDIT]: this.auditQueue,
      [QUEUES.SCHEDULER]: this.schedulerQueue,
    };
    return map[name];
  }

  async publish(event: DomainEvent): Promise<void> {
    const targetQueues = EVENT_ROUTING[event.eventName] || [QUEUES.AUDIT]; // Default to audit if unknown
    
    for (const queueName of targetQueues) {
      const queue = this.getQueueByName(queueName);
      if (queue) {
        await queue.add(event.eventName, event, {
          jobId: event.eventId, // Supports Idempotency
          attempts: 3,          // Default Retry Strategy
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        });
      }
    }
  }

  async publishBatch(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }
}
`,
    [path.join(EVENTS_DIR, 'bullmq', 'worker-base.class.ts')]: `
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
    const lockKey = \`worker:lock:\${job.name}:\${job.id}\`;
    const acquired = await this.lockService.acquire(lockKey, 30000); // 30 sec TTL
    
    if (!acquired) {
      this.logger.warn(\`Job \${job.id} is currently being processed by another worker.\`);
      throw new Error('Lock acquisition failed. Job will be retried.');
    }

    try {
      this.logger.log(\`Starting job \${job.id} for event \${job.name}\`);
      await this.handleJob(job);
      this.logger.log(\`Finished job \${job.id}\`);
    } catch (error) {
      this.logger.error(\`Failed job \${job.id}\`, error.stack);
      // Dead Letter Queue routing is handled by BullMQ configuration automatically
      // after max attempts are exhausted.
      throw error; 
    } finally {
      await this.lockService.release(lockKey);
    }
  }

  abstract handleJob(job: Job): Promise<void>;
}
`,
    [path.join(EVENTS_DIR, 'event-bus.service.ts')]: `
import { Injectable, Inject } from '@nestjs/common';
import { EVENT_PUBLISHER, EventPublisher } from './interfaces/event-publisher.interface';
import { DomainEvent } from './interfaces/domain-event.interface';

@Injectable()
export class EventBusService {
  constructor(
    @Inject(EVENT_PUBLISHER) private readonly publisher: EventPublisher
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    await this.publisher.publish(event);
  }

  async publishBatch(events: DomainEvent[]): Promise<void> {
    await this.publisher.publishBatch(events);
  }
}
`,
    [path.join(CACHE_DIR, 'distributed-lock.service.ts')]: `
import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DistributedLockService {
  private redis: Redis;

  constructor(private configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get('REDIS_HOST', 'localhost'),
      port: this.configService.get('REDIS_PORT', 6379),
    });
  }

  async acquire(key: string, ttlMs: number): Promise<boolean> {
    const result = await this.redis.set(key, 'LOCKED', 'PX', ttlMs, 'NX');
    return result === 'OK';
  }

  async release(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 1 files scaffolded successfully.');
