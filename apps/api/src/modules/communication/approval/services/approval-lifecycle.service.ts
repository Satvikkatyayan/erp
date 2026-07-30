import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ApprovalLifecycleInterface } from '../contracts/approval-lifecycle.interface';
import { ApprovalDecisionResult } from '../contracts/approval-decision.interface';
import { ApprovalIdentity } from '../domain/approval-identity';
import { ApprovalRuntimeState } from '../domain/approval-runtime-state';
import { ApprovalHistory, ApprovalHistoryEvent } from '../domain/approval-history';
import { ApprovalState } from '../domain/approval-state.enum';
import { ApprovalRequestedEvent } from '../events/approval-requested.event';
import { ApprovalAssignmentCreatedEvent } from '../events/approval-assignment-created.event';
import { randomUUID } from 'crypto';

@Injectable()
export class ApprovalLifecycleService implements ApprovalLifecycleInterface {
  constructor(private readonly eventBus: EventBus) {}

  initializeApproval(
    identity: ApprovalIdentity,
    state: ApprovalRuntimeState,
    history: ApprovalHistory,
    decision: ApprovalDecisionResult
  ): void {
    if (!decision.requiresApproval) {
      return;
    }

    state.transitionTo(ApprovalState.PENDING);
    history.append(new ApprovalHistoryEvent(new Date(), ApprovalState.PENDING));

    this.eventBus.publish(new ApprovalRequestedEvent(
      identity.correlationId,
      identity.approvalId,
      identity.workflowId,
      identity.workflowActivityId,
      identity.tenantId
    ));

    for (const approverId of decision.initialApprovers) {
      const assignmentId = randomUUID();
      this.eventBus.publish(new ApprovalAssignmentCreatedEvent(
        identity.correlationId,
        identity.approvalId,
        assignmentId,
        identity.tenantId
      ));
    }
  }
}
