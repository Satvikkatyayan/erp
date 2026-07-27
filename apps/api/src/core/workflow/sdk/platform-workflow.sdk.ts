import { Injectable } from '@nestjs/common';
import { WorkflowCommandService } from '../commands/workflow-command.service';
import { WorkflowQueryService } from '../queries/workflow-query.service';

/**
 * Public SDK for business modules.
 * Business modules should NEVER inject internal workflow services directly.
 */
@Injectable()
export class PlatformWorkflowSDK {
  constructor(
    private readonly commandService: WorkflowCommandService,
    private readonly queryService: WorkflowQueryService
  ) {}

  async start(definitionId: string, entityId: string, initialPayload: any) {
    return this.commandService.startInstance(definitionId, entityId, initialPayload);
  }

  async cancel(instanceId: string, reason: string) {
    return this.commandService.cancelInstance(instanceId, reason);
  }

  async completeTask(taskId: string, payload: any) {
    return this.commandService.completeTask(taskId, payload);
  }

  async getInbox(userId: string) {
    return this.queryService.getInbox(userId);
  }
}