import { Injectable } from '@nestjs/common';
import { ApprovalDecisionInterface, ApprovalDecisionResult } from '../contracts/approval-decision.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';

@Injectable()
export class ApprovalDecisionService implements ApprovalDecisionInterface {
  evaluate(command: DispatchCommunicationCommand): ApprovalDecisionResult {
    // For now, no approval required by default unless specifically injected via payload or policy
    if (command.payload && command.payload.requiresApproval) {
      return new ApprovalDecisionResult(true, ['admin-id-1']);
    }
    return new ApprovalDecisionResult(false);
  }
}
