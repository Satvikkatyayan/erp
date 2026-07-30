import { ApprovalIdentity } from '../domain/approval-identity';
import { ApprovalDecisionResult } from './approval-decision.interface';
import { ApprovalRuntimeState } from '../domain/approval-runtime-state';
import { ApprovalHistory } from '../domain/approval-history';

export interface ApprovalLifecycleInterface {
  initializeApproval(
    identity: ApprovalIdentity,
    state: ApprovalRuntimeState,
    history: ApprovalHistory,
    decision: ApprovalDecisionResult
  ): void;
}
