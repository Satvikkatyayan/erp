import { WorkflowDecisionInterface, WorkflowDecisionResult } from '../contracts/workflow-decision.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
export declare class WorkflowDecisionService implements WorkflowDecisionInterface {
    evaluate(command: DispatchCommunicationCommand): WorkflowDecisionResult;
}
//# sourceMappingURL=workflow-decision.service.d.ts.map