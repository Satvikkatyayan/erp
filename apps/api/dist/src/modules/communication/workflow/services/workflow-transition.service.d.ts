import { EventBus } from '@nestjs/cqrs';
import { WorkflowTransitionInterface } from '../contracts/workflow-transition.interface';
import { WorkflowDecisionResult } from '../contracts/workflow-decision.interface';
import { WorkflowIdentity } from '../domain/workflow-identity';
import { WorkflowRuntimeState } from '../domain/workflow-runtime-state';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
export declare class WorkflowTransitionService implements WorkflowTransitionInterface {
    private readonly eventBus;
    constructor(eventBus: EventBus);
    executeTransition(identity: WorkflowIdentity, state: WorkflowRuntimeState, decision: WorkflowDecisionResult, command: DispatchCommunicationCommand): void;
}
//# sourceMappingURL=workflow-transition.service.d.ts.map