import { WorkflowDecisionResult } from './workflow-decision.interface';
import { WorkflowIdentity } from '../domain/workflow-identity';
import { WorkflowRuntimeState } from '../domain/workflow-runtime-state';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
export interface WorkflowTransitionInterface {
    executeTransition(identity: WorkflowIdentity, state: WorkflowRuntimeState, decision: WorkflowDecisionResult, command: DispatchCommunicationCommand): void;
}
//# sourceMappingURL=workflow-transition.interface.d.ts.map