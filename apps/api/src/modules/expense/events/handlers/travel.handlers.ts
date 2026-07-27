import { Injectable } from '@nestjs/common';
import { EventSubscriber, DomainEvent } from '../../../../core/events/event.contracts';

@Injectable()
export class TravelApprovedHandler implements EventSubscriber {
  async handle(event: DomainEvent<any>): Promise<void> {
    // Handle logic
  }
}

@Injectable()
export class TravelCompletedHandler implements EventSubscriber {
  async handle(event: DomainEvent<any>): Promise<void> {
    // Handle logic
  }
}
