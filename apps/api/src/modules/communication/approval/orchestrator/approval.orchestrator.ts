import { Injectable, Inject } from '@nestjs/common';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { ApprovalDecisionInterface } from '../contracts/approval-decision.interface';
import { ApprovalLifecycleInterface } from '../contracts/approval-lifecycle.interface';
import { ApprovalIdentity } from '../domain/approval-identity';
import { ApprovalRuntimeState } from '../domain/approval-runtime-state';
import { ApprovalHistory } from '../domain/approval-history';
import { DeliveryResult } from '../../domain/delivery-result';
import { DeliveryLifecycle } from '../../domain/delivery-lifecycle.enum';
import { SchedulingOrchestrator } from '../../scheduling/orchestrator/scheduling.orchestrator';
import { randomUUID } from 'crypto';

@Injectable()
export class ApprovalOrchestrator {
  constructor(
    @Inject('ApprovalDecisionInterface')
    private readonly decisionService: ApprovalDecisionInterface,
    @Inject('ApprovalLifecycleInterface')
    private readonly lifecycleService: ApprovalLifecycleInterface,
    // The Approval orchestrator returns outcomes to Workflow, but wait, the instructions state:
    // "Route approval-required workflow activities through the Approval Orchestrator before delegating to Scheduling."
    // So the ApprovalOrchestrator takes the activity, checks if approval is needed, if not, or if auto-approved, passes to SchedulingOrchestrator.
    // If pending, it halts progression (returns deferred).
    private readonly schedulingOrchestrator: SchedulingOrchestrator
  ) {}

  async processCommand(
    workflowId: string, 
    workflowActivityId: string, 
    command: DispatchCommunicationCommand
  ): Promise<DeliveryResult> {
    const approvalId = randomUUID();
    // Assuming correlationId is available via command, fallback to randomUUID for interface sake
    const correlationId = randomUUID(); 
    
    const identity = new ApprovalIdentity(
      approvalId, 
      workflowId, 
      workflowActivityId, 
      correlationId, 
      command.tenantId
    );
    const state = new ApprovalRuntimeState(approvalId);
    const history = new ApprovalHistory(approvalId);

    // 1. Evaluate Decision
    const decision = this.decisionService.evaluate(command);

    if (decision.requiresApproval) {
      // 2. Lifecycle transitions
      this.lifecycleService.initializeApproval(identity, state, history, decision);

      // 3. Return deferred to Workflow
      return new DeliveryResult(true, DeliveryLifecycle.RECEIVED, correlationId, {
        code: 'APPROVAL_PENDING',
        message: 'Communication requires human approval'
      });
    }

    // No approval required, delegate down to Scheduling (as dictated by runtime boundaries)
    return this.schedulingOrchestrator.processCommand(command);
  }
}
