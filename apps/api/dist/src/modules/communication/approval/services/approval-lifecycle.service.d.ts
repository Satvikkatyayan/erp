import { EventBus } from '@nestjs/cqrs';
import { ApprovalLifecycleInterface } from '../contracts/approval-lifecycle.interface';
import { ApprovalDecisionResult } from '../contracts/approval-decision.interface';
import { ApprovalIdentity } from '../domain/approval-identity';
import { ApprovalRuntimeState } from '../domain/approval-runtime-state';
import { ApprovalHistory } from '../domain/approval-history';
export declare class ApprovalLifecycleService implements ApprovalLifecycleInterface {
    private readonly eventBus;
    constructor(eventBus: EventBus);
    initializeApproval(identity: ApprovalIdentity, state: ApprovalRuntimeState, history: ApprovalHistory, decision: ApprovalDecisionResult): void;
}
//# sourceMappingURL=approval-lifecycle.service.d.ts.map