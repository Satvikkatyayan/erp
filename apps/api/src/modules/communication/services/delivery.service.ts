import { Injectable } from '@nestjs/common';
import { DeliveryServiceInterface } from '../contracts/delivery-service.interface';
import { DispatchCommunicationCommand } from '../commands/dispatch-communication.command';
import { DeliveryResult } from '../domain/delivery-result';
import { DeliveryContext } from '../domain/delivery-context';
import { DeliveryLifecycle } from '../domain/delivery-lifecycle.enum';
import { TemplateRenderingService } from './template-rendering.service';
import { RoutingOrchestrator } from '../routing/orchestrator/routing.orchestrator';
import { RoutingDecisionMadeEvent } from '../events/routing-decision-made.event';
import { RoutingExhaustedEvent } from '../events/routing-exhausted.event';
import { RenderTemplateQuery } from '../queries/render-template.query';
import { ProviderResolutionException } from '../exceptions/provider-resolution.exception';
import { RenderError } from '../exceptions/render.exceptions';
import { DeliveryOrchestrationException } from '../exceptions/delivery-orchestration.exception';
import { randomUUID } from 'crypto';
import { EventBus } from '@nestjs/cqrs';
import { DeliveryDispatchedEvent } from '../events/delivery-dispatched.event';
import { DeliveryCompletedEvent } from '../events/delivery-completed.event';
import { DeliveryFailedEvent } from '../events/delivery-failed.event';

@Injectable()
export class DeliveryService implements DeliveryServiceInterface {
  constructor(
    private readonly templateRenderingService: TemplateRenderingService,
    private readonly routingOrchestrator: RoutingOrchestrator,
    private readonly eventBus: EventBus
  ) {}

  async executeDelivery(command: DispatchCommunicationCommand): Promise<DeliveryResult> {
    const correlationId = randomUUID();
    
    // Create immutable DeliveryContext
    const context = new DeliveryContext(
      command.tenantId,
      command.recipient,
      command.channel,
      command.templateCode,
      command.payload || {},
      correlationId
    );

    if (!context.tenantId || !context.recipient || !context.channel || !context.templateCode) {
      return new DeliveryResult(false, DeliveryLifecycle.RECEIVED, correlationId, {
        code: 'VALIDATION_FAILED',
        message: 'Missing required context fields (tenantId, recipient, channel, templateCode)',
      });
    }

    let currentStage = DeliveryLifecycle.VALIDATED;

    this.eventBus.publish(
      new DeliveryDispatchedEvent(
        correlationId,
        context.tenantId,
        context.channel,
        context.templateCode
      )
    );

    try {
      // 1. Orchestrate rendering
      const renderQuery = new RenderTemplateQuery(
        context.tenantId,
        context.templateCode,
        context.payload
      );
      
      const renderResult = await this.templateRenderingService.renderTemplate(renderQuery);
      currentStage = DeliveryLifecycle.RENDERED;

      // 2. Request provider resolution via Routing Layer
      const routingResult = this.routingOrchestrator.selectProvider(context);
      
      if (!routingResult) {
        this.eventBus.publish(new RoutingExhaustedEvent(correlationId, context.tenantId, context.channel));
        throw new ProviderResolutionException(context.channel, {});
      }
      
      this.eventBus.publish(new RoutingDecisionMadeEvent(
        correlationId,
        routingResult.routingDecisionId,
        routingResult.provider.descriptor.name,
        context.tenantId
      ));

      currentStage = DeliveryLifecycle.PROVIDER_RESOLVED;

      // 3. Invoke CommunicationProvider contract
      await routingResult.provider.provider.send(renderResult);
      currentStage = DeliveryLifecycle.PROVIDER_INVOKED;

      this.eventBus.publish(
        new DeliveryCompletedEvent(
          correlationId,
          context.tenantId,
          context.channel,
          routingResult.provider.descriptor.name
        )
      );

      return new DeliveryResult(true, DeliveryLifecycle.COMPLETED, correlationId);

    } catch (error: any) {
      let errorCode = 'UNKNOWN_ERROR';
      if (error instanceof RenderError) {
        errorCode = 'RENDER_ERROR';
      } else if (error instanceof ProviderResolutionException) {
        errorCode = 'PROVIDER_RESOLUTION_ERROR';
      } else if (error instanceof DeliveryOrchestrationException) {
        errorCode = 'ORCHESTRATION_ERROR';
      } else {
        errorCode = 'PROVIDER_INVOCATION_ERROR'; // or generic transport error
      }

      this.eventBus.publish(
        new DeliveryFailedEvent(
          correlationId,
          context.tenantId,
          context.channel,
          currentStage,
          errorCode,
          error.message || 'An unexpected error occurred during delivery'
        )
      );

      return new DeliveryResult(false, currentStage, correlationId, {
        code: errorCode,
        message: error.message || 'An unexpected error occurred during delivery',
      });
    }
  }
}
