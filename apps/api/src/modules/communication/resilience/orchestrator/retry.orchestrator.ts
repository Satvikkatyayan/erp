import { Injectable, Logger } from '@nestjs/common';
import { DeliveryService } from '../../services/delivery.service';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { Channel } from '../../domain/channel.enum';

@Injectable()
export class RetryOrchestrator {
  private readonly logger = new Logger(RetryOrchestrator.name);

  constructor(private readonly deliveryService: DeliveryService) {}

  async executeRetry(correlationId: string, tenantId: string, channel: string, attemptId: string): Promise<void> {
    this.logger.log(`Executing retry for correlationId: ${correlationId}, attemptId: ${attemptId}`);

    // In a real implementation, the original command payload would be retrieved from a database 
    // or an event store using the correlationId. We mock the command reconstruction here 
    // to satisfy the Delivery Pipeline's requirements without changing the original events.
    const command = new DispatchCommunicationCommand(
      tenantId,
      'unknown-recipient', // Mocked due to missing payload in event
      channel as Channel,
      'unknown-template', // Mocked due to missing payload in event
      { _isRetry: true, _attemptId: attemptId }
    );

    // Re-dispatch into the top-level delivery pipeline
    // The correlationId is generated anew by DeliveryService currently, 
    // but in a real system we would pass the original correlationId into the command/context.
    await this.deliveryService.executeDelivery(command);
  }
}
