import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DispatchCommunicationCommand } from '../dispatch-communication.command';
import { DeliveryResult } from '../../domain/delivery-result';
import { WorkflowOrchestrator } from '../../workflow/orchestrator/workflow.orchestrator';

@CommandHandler(DispatchCommunicationCommand)
export class DispatchCommunicationHandler implements ICommandHandler<DispatchCommunicationCommand> {
  constructor(
    private readonly workflowOrchestrator: WorkflowOrchestrator
  ) {}

  async execute(command: DispatchCommunicationCommand): Promise<DeliveryResult> {
    return this.workflowOrchestrator.processCommand(command);
  }
}
