import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';

export class ApprovalDecisionResult {
  constructor(
    public readonly requiresApproval: boolean,
    public readonly initialApprovers: string[] = []
  ) {
    Object.freeze(this);
  }
}

export interface ApprovalDecisionInterface {
  evaluate(command: DispatchCommunicationCommand): ApprovalDecisionResult;
}
