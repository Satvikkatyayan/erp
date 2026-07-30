import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
export declare class WorkflowDecisionResult {
    readonly nextActivityType: string | null;
    readonly shouldPause: boolean;
    readonly shouldTerminate: boolean;
    constructor(nextActivityType: string | null, shouldPause: boolean, shouldTerminate: boolean);
}
export interface WorkflowDecisionInterface {
    evaluate(command: DispatchCommunicationCommand): WorkflowDecisionResult;
}
//# sourceMappingURL=workflow-decision.interface.d.ts.map