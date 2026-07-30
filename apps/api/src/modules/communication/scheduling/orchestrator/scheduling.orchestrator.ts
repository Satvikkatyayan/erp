import { Injectable, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { SchedulingEligibilityInterface } from '../contracts/scheduling-eligibility.interface';
import { SchedulingPolicyInterface } from '../contracts/scheduling-policy.interface';
import { DeliveryServiceInterface } from '../../contracts/delivery-service.interface';
import { DeliveryResult } from '../../domain/delivery-result';
import { DeliveryLifecycle } from '../../domain/delivery-lifecycle.enum';
import { ScheduleCreatedEvent } from '../../events/schedule-created.event';
import { randomUUID } from 'crypto';

@Injectable()
export class SchedulingOrchestrator {
  constructor(
    @Inject('SchedulingEligibilityInterface')
    private readonly eligibilityService: SchedulingEligibilityInterface,
    @Inject('SchedulingPolicyInterface')
    private readonly policyService: SchedulingPolicyInterface,
    @Inject('DeliveryServiceInterface')
    private readonly deliveryService: DeliveryServiceInterface,
    private readonly eventBus: EventBus
  ) {}

  async processCommand(command: DispatchCommunicationCommand): Promise<DeliveryResult> {
    const isEligible = this.eligibilityService.isEligibleForScheduling(command);

    if (!isEligible) {
      // Immediate execution - bypass scheduling deferral
      return this.deliveryService.executeDelivery(command);
    }

    const releaseTime = this.policyService.determineReleaseTime(command);
    const scheduleId = randomUUID();
    const correlationId = randomUUID(); // Used to trace across the deferral boundary
    
    this.eventBus.publish(new ScheduleCreatedEvent(
      correlationId,
      scheduleId,
      command.tenantId,
      releaseTime
    ));

    // Return a deferred result
    return new DeliveryResult(true, DeliveryLifecycle.RECEIVED, correlationId, {
      code: 'SCHEDULED',
      message: `Communication scheduled for ${releaseTime.toISOString()}`
    });
  }
}
