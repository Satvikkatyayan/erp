import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TelemetryInterface } from '../contracts/telemetry.interface';
import { DeliveryDispatchedEvent } from '../../events/delivery-dispatched.event';
import { DeliveryCompletedEvent } from '../../events/delivery-completed.event';
import { DeliveryFailedEvent } from '../../events/delivery-failed.event';

@EventsHandler(DeliveryDispatchedEvent, DeliveryCompletedEvent, DeliveryFailedEvent)
export class DeliveryLifecycleObserver implements IEventHandler<DeliveryDispatchedEvent | DeliveryCompletedEvent | DeliveryFailedEvent> {
  private readonly dispatchTimes = new Map<string, number>();

  constructor(
    @Inject('TelemetryInterface')
    private readonly telemetry: TelemetryInterface
  ) {}

  async handle(event: DeliveryDispatchedEvent | DeliveryCompletedEvent | DeliveryFailedEvent): Promise<void> {
    try {
      if (event instanceof DeliveryDispatchedEvent) {
        this.dispatchTimes.set(event.correlationId, Date.now());
        
        this.telemetry.incrementCounter('delivery_dispatched_total', 1, {
          tenantId: event.tenantId,
          channel: event.channel
        });
        
        this.telemetry.logInfo('Delivery dispatched', {
          correlationId: event.correlationId,
          tenantId: event.tenantId,
          channel: event.channel,
          templateCode: event.templateCode
        });
      } 
      else if (event instanceof DeliveryCompletedEvent) {
        const duration = this.computeDuration(event.correlationId);
        
        this.telemetry.incrementCounter('delivery_completed_total', 1, {
          tenantId: event.tenantId,
          channel: event.channel,
          provider: event.providerName
        });
        
        if (duration !== null) {
          this.telemetry.recordHistogram('delivery_duration_ms', duration, { channel: event.channel });
        }

        this.telemetry.logInfo('Delivery completed', {
          correlationId: event.correlationId,
          provider: event.providerName,
          durationMs: duration
        });
      }
      else if (event instanceof DeliveryFailedEvent) {
        const duration = this.computeDuration(event.correlationId);

        this.telemetry.incrementCounter('delivery_failed_total', 1, {
          tenantId: event.tenantId,
          channel: event.channel,
          stage: event.stage,
          errorCode: event.errorCode
        });

        this.telemetry.logError(`Delivery failed at ${event.stage}: ${event.errorMessage}`, undefined, {
          correlationId: event.correlationId,
          errorCode: event.errorCode,
          durationMs: duration
        });
      }
    } catch (error) {
      // Observers must fail safely and NEVER throw exceptions into the Delivery Pipeline
      console.error('CRITICAL: Observability failure in DeliveryLifecycleObserver', error);
    }
  }

  private computeDuration(correlationId: string): number | null {
    const startTime = this.dispatchTimes.get(correlationId);
    if (startTime) {
      this.dispatchTimes.delete(correlationId);
      return Date.now() - startTime;
    }
    return null;
  }
}
