import { IEventHandler } from '@nestjs/cqrs';
import { TelemetryInterface } from '../contracts/telemetry.interface';
import { DeliveryDispatchedEvent } from '../../events/delivery-dispatched.event';
import { DeliveryCompletedEvent } from '../../events/delivery-completed.event';
import { DeliveryFailedEvent } from '../../events/delivery-failed.event';
export declare class DeliveryLifecycleObserver implements IEventHandler<DeliveryDispatchedEvent | DeliveryCompletedEvent | DeliveryFailedEvent> {
    private readonly telemetry;
    private readonly dispatchTimes;
    constructor(telemetry: TelemetryInterface);
    handle(event: DeliveryDispatchedEvent | DeliveryCompletedEvent | DeliveryFailedEvent): Promise<void>;
    private computeDuration;
}
//# sourceMappingURL=delivery-lifecycle.observer.d.ts.map