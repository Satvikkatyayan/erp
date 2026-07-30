import { EventsHandler, IEventHandler, EventBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeliveryFailedEvent } from '../../events/delivery-failed.event';
import { RetryScheduledEvent } from '../../events/retry-scheduled.event';
import { RetryExhaustedEvent } from '../../events/retry-exhausted.event';
import { FailureClassifierInterface } from '../contracts/failure-classifier.interface';
import { RetryPolicyInterface } from '../contracts/retry-policy.interface';
import { RetryScheduler } from '../scheduler/retry.scheduler';

@EventsHandler(DeliveryFailedEvent)
export class DeliveryFailureObserver implements IEventHandler<DeliveryFailedEvent> {
  // Simple in-memory tracker for attempts
  private readonly attemptsMap = new Map<string, number>();

  constructor(
    @Inject('FailureClassifierInterface')
    private readonly classifier: FailureClassifierInterface,
    @Inject('RetryPolicyInterface')
    private readonly policy: RetryPolicyInterface,
    private readonly scheduler: RetryScheduler,
    private readonly eventBus: EventBus
  ) {}

  async handle(event: DeliveryFailedEvent): Promise<void> {
    try {
      if (!this.classifier.isTransient(event.errorCode)) {
        // Terminal failure, do not retry
        return;
      }

      const currentAttempts = (this.attemptsMap.get(event.correlationId) || 0) + 1;
      this.attemptsMap.set(event.correlationId, currentAttempts);

      if (this.policy.canRetry(currentAttempts)) {
        const delayMs = this.policy.computeDelay(currentAttempts);
        
        // Publish Domain Event owned by Delivery Pipeline
        this.eventBus.publish(new RetryScheduledEvent(event.correlationId, currentAttempts, delayMs));
        
        // Asynchronously schedule the retry
        await this.scheduler.scheduleRetry(event.correlationId, event.tenantId, event.channel, delayMs);
      } else {
        // Publish Domain Event owned by Delivery Pipeline
        this.eventBus.publish(new RetryExhaustedEvent(event.correlationId, currentAttempts, event.errorCode));
      }
    } catch (error) {
      // Observers must fail safely and NEVER interrupt the initial delivery execution
      console.error('Isolated resilience observer failure', error);
    }
  }
}
