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