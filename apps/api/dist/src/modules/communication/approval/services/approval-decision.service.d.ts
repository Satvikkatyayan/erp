import { ApprovalDecisionInterface, ApprovalDecisionResult } from '../contracts/approval-decision.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
export declare class ApprovalDecisionService implements ApprovalDecisionInterface {
    evaluate(command: DispatchCommunicationCommand): ApprovalDecisionResult;
}
//# sourceMappingURL=approval-decision.service.d.ts.map