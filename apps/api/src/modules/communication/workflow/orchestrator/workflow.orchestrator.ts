import { Injectable, Inject } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { WorkflowDecisionInterface } from '../contracts/workflow-decision.interface';
import { WorkflowTransitionInterface } from '../contracts/workflow-transition.interface';
import { WorkflowIdentity } from '../domain/workflow-identity';
import { WorkflowRuntimeState } from '../domain/workflow-runtime-state';
import { WorkflowStartedEvent } from '../events/workflow-started.event';
import { ApprovalOrchestrator } from '../../approval/orchestrator/approval.orchestrator';
import { DeliveryResult } from '../../domain/delivery-result';
import { randomUUID } from 'crypto';

@Injectable()
export class WorkflowOrchestrator {
  constructor(
    @Inject('WorkflowDecisionInterface')
    private readonly decisionService: WorkflowDecisionInterface,
    @Inject('WorkflowTransitionInterface')
    private readonly transitionService: WorkflowTransitionInterface,
    private readonly approvalOrchestrator: ApprovalOrchestrator,
    private readonly eventBus: EventBus
  ) {}

  async processCommand(command: DispatchCommunicationCommand): Promise<DeliveryResult> {
    const workflowId = randomUUID();
    // DeliveryService or the caller usually provides correlationId, but if missing, generate it here
    const correlationId = randomUUID(); 
    
    const identity = new WorkflowIdentity(workflowId, correlationId, command.tenantId);
    const state = new WorkflowRuntimeState(workflowId);

    // Publish Workflow Started
    this.eventBus.publish(new WorkflowStartedEvent(
      identity.correlationId,
      identity.workflowId,
      identity.tenantId
    ));

    // Phase 1: Decision Evaluation (Strictly abstract analysis)
    const decision = this.decisionService.evaluate(command);

    // Phase 2: Transition Execution (Strictly applying the decision)
    this.transitionService.executeTransition(identity, state, decision, command);

    // Phase 3: Route through Approval Orchestrator
    // Workflow has decided WHAT to do. Approval must decide WHETHER it is permitted.
    // If approved or no approval required, ApprovalOrchestrator delegates to Scheduling.
    return this.approvalOrchestrator.processCommand(identity.workflowId, 'latest-activity-id', command);
  }
}
