import { Injectable } from '@nestjs/common';
import { EventBusService } from './event-bus.service';

@Injectable()
export class PlatformEventPublisher {
  constructor(private readonly eventBus: EventBusService) {}

  publish(event: any): void {
    this.eventBus.publish(event);
  }

  publishAll(events: any[]): void {
    for (const event of events) {
      this.publish(event);
    }
  }
}
