import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
export declare class ApprovalDecisionResult {
    readonly requiresApproval: boolean;
    readonly initialApprovers: string[];
    constructor(requiresApproval: boolean, initialApprovers?: string[]);
}
export interface ApprovalDecisionInterface {
    evaluate(command: DispatchCommunicationCommand): ApprovalDecisionResult;
}
//# sourceMappingURL=approval-decision.interface.d.ts.map