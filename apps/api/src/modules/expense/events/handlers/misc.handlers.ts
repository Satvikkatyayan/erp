import { Injectable } from '@nestjs/common';
import { EventSubscriber, DomainEvent } from '../../../../core/events/event.contracts';

@Injectable()
export class CorporateCardImportedHandler implements EventSubscriber {
  async handle(event: DomainEvent<any>): Promise<void> {
    // Handle logic
  }
}

@Injectable()
export class AdvanceSettledHandler implements EventSubscriber {
  async handle(event: DomainEvent<any>): Promise<void> {
    // Handle logic
  }
}
