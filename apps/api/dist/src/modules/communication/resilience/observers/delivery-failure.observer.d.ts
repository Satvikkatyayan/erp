import { IEventHandler, EventBus } from '@nestjs/cqrs';
import { DeliveryFailedEvent } from '../../events/delivery-failed.event';
import { FailureClassifierInterface } from '../contracts/failure-classifier.interface';
import { RetryPolicyInterface } from '../contracts/retry-policy.interface';
import { RetryScheduler } from '../scheduler/retry.scheduler';
export declare class DeliveryFailureObserver implements IEventHandler<DeliveryFailedEvent> {
    private readonly classifier;
    private readonly policy;
    private readonly scheduler;
    private readonly eventBus;
    private readonly attemptsMap;
    constructor(classifier: FailureClassifierInterface, policy: RetryPolicyInterface, scheduler: RetryScheduler, eventBus: EventBus);
    handle(event: DeliveryFailedEvent): Promise<void>;
}
//# sourceMappingURL=delivery-failure.observer.d.ts.map