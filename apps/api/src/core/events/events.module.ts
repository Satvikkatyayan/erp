import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from './constants/queues.constant';
import { EventBusService } from './event-bus.service';
import { BullMQPublisher } from './bullmq/bullmq-publisher.service';
import { EVENT_PUBLISHER } from './interfaces/event-publisher.interface';
import { DistributedLockService } from '../cache/distributed-lock.service';

import { EventRegistry } from '../registry/event.registry';

@Global()
@Module({
  imports: [
    BullModule.registerQueue(
      { name: QUEUES.WORKFLOW },
      { name: QUEUES.NOTIFICATION },
      { name: QUEUES.REPORT },
      { name: QUEUES.SEARCH },
      { name: QUEUES.INTEGRATION },
      { name: QUEUES.DOCUMENT },
      { name: QUEUES.AUDIT },
      { name: QUEUES.SCHEDULER },
    ),
  ],
  providers: [
    {
      provide: EVENT_PUBLISHER,
      useClass: BullMQPublisher,
    },
    EventBusService,
    DistributedLockService,
    EventRegistry,
  ],
  exports: [EventBusService, DistributedLockService, EventRegistry],
})
export class EventsModule {}
