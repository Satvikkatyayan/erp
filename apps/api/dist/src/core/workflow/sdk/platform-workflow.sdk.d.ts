import { WorkflowCommandService } from '../commands/workflow-command.service';
import { WorkflowQueryService } from '../queries/workflow-query.service';
export declare class PlatformWorkflowSDK {
    private readonly commandService;
    private readonly queryService;
    constructor(commandService: WorkflowCommandService, queryService: WorkflowQueryService);
    start(definitionId: string, entityId: string, initialPayload: any): Promise<void>;
    cancel(instanceId: string, reason: string): Promise<void>;
    completeTask(taskId: string, payload: any): Promise<void>;
    getInbox(userId: string): Promise<void>;
}
//# sourceMappingURL=platform-workflow.sdk.d.ts.map