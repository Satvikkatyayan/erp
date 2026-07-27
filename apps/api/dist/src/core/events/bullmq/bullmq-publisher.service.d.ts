import { Queue } from 'bullmq';
import { EventPublisher } from '../interfaces/event-publisher.interface';
import { DomainEvent } from '../interfaces/domain-event.interface';
export declare class BullMQPublisher implements EventPublisher {
    private workflowQueue;
    private notificationQueue;
    private reportQueue;
    private searchQueue;
    private integrationQueue;
    private documentQueue;
    private auditQueue;
    private schedulerQueue;
    constructor(workflowQueue: Queue, notificationQueue: Queue, reportQueue: Queue, searchQueue: Queue, integrationQueue: Queue, documentQueue: Queue, auditQueue: Queue, schedulerQueue: Queue);
    private getQueueByName;
    publish(event: DomainEvent): Promise<void>;
    publishBatch(events: DomainEvent[]): Promise<void>;
}
//# sourceMappingURL=bullmq-publisher.service.d.ts.map