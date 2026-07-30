import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { WorkflowTransitionInterface } from '../contracts/workflow-transition.interface';
import { WorkflowDecisionResult } from '../contracts/workflow-decision.interface';
import { WorkflowIdentity } from '../domain/workflow-identity';
import { WorkflowRuntimeState } from '../domain/workflow-runtime-state';
import { WorkflowState } from '../domain/workflow-state.enum';
import { WorkflowActivity } from '../domain/workflow-activity';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { WorkflowActivitySelectedEvent } from '../events/workflow-activity-selected.event';
import { WorkflowPausedEvent } from '../events/workflow-paused.event';
import { WorkflowCompletedEvent } from '../events/workflow-completed.event';
import { randomUUID } from 'crypto';

@Injectable()
export class WorkflowTransitionService implements WorkflowTransitionInterface {
  constructor(private readonly eventBus: EventBus) {}

  executeTransition(
    identity: WorkflowIdentity,
    state: WorkflowRuntimeState,
    decision: WorkflowDecisionResult,
    command: DispatchCommunicationCommand
  ): void {
    if (decision.nextActivityType) {
      const activityId = randomUUID();
      const activity = new WorkflowActivity(
        activityId,
        identity.workflowId,
        decision.nextActivityType,
        command.payload
      );
      
      state.addActivity(activity);
      
      this.eventBus.publish(new WorkflowActivitySelectedEvent(
        identity.correlationId,
        identity.workflowId,
        activityId,
        decision.nextActivityType,
        identity.tenantId
      ));
    }

    if (decision.shouldPause) {
      state.transitionTo(WorkflowState.WAITING);
      this.eventBus.publish(new WorkflowPausedEvent(
        identity.correlationId,
        identity.workflowId,
        'SYSTEM_PAUSE',
        identity.tenantId
      ));
      return;
    }

    if (decision.shouldTerminate) {
      state.transitionTo(WorkflowState.COMPLETED);
      this.eventBus.publish(new WorkflowCompletedEvent(
        identity.correlationId,
        identity.workflowId,
        identity.tenantId
      ));
      return;
    }

    state.transitionTo(WorkflowState.ACTIVE);
  }
}
