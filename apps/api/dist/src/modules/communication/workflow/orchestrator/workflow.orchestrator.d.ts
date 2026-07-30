import { EventBus } from '@nestjs/cqrs';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { WorkflowDecisionInterface } from '../contracts/workflow-decision.interface';
import { WorkflowTransitionInterface } from '../contracts/workflow-transition.interface';
import { ApprovalOrchestrator } from '../../approval/orchestrator/approval.orchestrator';
import { DeliveryResult } from '../../domain/delivery-result';
export declare class WorkflowOrchestrator {
    private readonly decisionService;
    private readonly transitionService;
    private readonly approvalOrchestrator;
    private readonly eventBus;
    constructor(decisionService: WorkflowDecisionInterface, transitionService: WorkflowTransitionInterface, approvalOrchestrator: ApprovalOrchestrator, eventBus: EventBus);
    processCommand(command: DispatchCommunicationCommand): Promise<DeliveryResult>;
}
//# sourceMappingURL=workflow.orchestrator.d.ts.map