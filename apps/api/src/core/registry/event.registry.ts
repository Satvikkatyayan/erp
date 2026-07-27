import { Injectable } from '@nestjs/common';
import { AbstractRegistry } from './abstract.registry';
import { EventSubscriber } from '../events/event.contracts';

@Injectable()
export class EventRegistry extends AbstractRegistry<EventSubscriber> {
  protected supportsMultipleItemsPerKey(): boolean {
    return true; // Multiple subscribers can listen to one event
  }

  getHandlers(eventType: string): EventSubscriber[] {
    return this.getAllItems(eventType);
  }
}
