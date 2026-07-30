import { Injectable, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DeliveryServiceInterface } from '../../contracts/delivery-service.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { ScheduleReleasedEvent } from '../../events/schedule-released.event';
import { randomUUID } from 'crypto';

@Injectable()
export class ScheduleReleaseCoordinator {
  constructor(
    @Inject('DeliveryServiceInterface')
    private readonly deliveryService: DeliveryServiceInterface,
    private readonly eventBus: EventBus
  ) {}

  async release(scheduleId: string, correlationId: string, command: DispatchCommunicationCommand): Promise<void> {
    const scheduleReleaseId = randomUUID();

    this.eventBus.publish(new ScheduleReleasedEvent(
      correlationId,
      scheduleId,
      scheduleReleaseId,
      command.tenantId
    ));

    // Delegate execution exclusively to the Delivery Pipeline
    await this.deliveryService.executeDelivery(command);
  }
}
