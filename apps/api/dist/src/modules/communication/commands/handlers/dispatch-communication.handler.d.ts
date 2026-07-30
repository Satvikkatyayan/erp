import { ICommandHandler } from '@nestjs/cqrs';
import { DispatchCommunicationCommand } from '../dispatch-communication.command';
import { DeliveryResult } from '../../domain/delivery-result';
import { WorkflowOrchestrator } from '../../workflow/orchestrator/workflow.orchestrator';
export declare class DispatchCommunicationHandler implements ICommandHandler<DispatchCommunicationCommand> {
    private readonly workflowOrchestrator;
    constructor(workflowOrchestrator: WorkflowOrchestrator);
    execute(command: DispatchCommunicationCommand): Promise<DeliveryResult>;
}
//# sourceMappingURL=dispatch-communication.handler.d.ts.map