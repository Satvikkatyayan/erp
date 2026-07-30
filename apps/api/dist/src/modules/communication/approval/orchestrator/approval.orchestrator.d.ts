import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { ApprovalDecisionInterface } from '../contracts/approval-decision.interface';
import { ApprovalLifecycleInterface } from '../contracts/approval-lifecycle.interface';
import { DeliveryResult } from '../../domain/delivery-result';
import { SchedulingOrchestrator } from '../../scheduling/orchestrator/scheduling.orchestrator';
export declare class ApprovalOrchestrator {
    private readonly decisionService;
    private readonly lifecycleService;
    private readonly schedulingOrchestrator;
    constructor(decisionService: ApprovalDecisionInterface, lifecycleService: ApprovalLifecycleInterface, schedulingOrchestrator: SchedulingOrchestrator);
    processCommand(workflowId: string, workflowActivityId: string, command: DispatchCommunicationCommand): Promise<DeliveryResult>;
}
//# sourceMappingURL=approval.orchestrator.d.ts.map