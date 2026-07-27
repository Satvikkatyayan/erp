import { Injectable } from '@nestjs/common';
import { EventSubscriber, DomainEvent } from '../../../../core/events/event.contracts';

@Injectable()
export class ExpenseSubmittedHandler implements EventSubscriber {
  async handle(event: DomainEvent<any>): Promise<void> {
    // Handle logic
  }
}

@Injectable()
export class ExpenseApprovedHandler implements EventSubscriber {
  async handle(event: DomainEvent<any>): Promise<void> {
    // Handle logic
  }
}

@Injectable()
export class ExpenseRejectedHandler implements EventSubscriber {
  async handle(event: DomainEvent<any>): Promise<void> {
    // Handle logic
  }
}

@Injectable()
export class ExpensePaidHandler implements EventSubscriber {
  async handle(event: DomainEvent<any>): Promise<void> {
    // Handle logic
  }
}
