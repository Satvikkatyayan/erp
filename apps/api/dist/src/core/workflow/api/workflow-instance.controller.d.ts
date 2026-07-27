import { WorkflowCommandService } from '../commands/workflow-command.service';
import { WorkflowQueryService } from '../queries/workflow-query.service';
export declare class WorkflowInstanceController {
    private readonly commandService;
    private readonly queryService;
    constructor(commandService: WorkflowCommandService, queryService: WorkflowQueryService);
    pause(id: string): Promise<{
        status: string;
        id: string;
    }>;
    resume(id: string): Promise<{
        status: string;
        id: string;
    }>;
    reopen(id: string): Promise<{
        status: string;
        id: string;
    }>;
    escalate(id: string): Promise<{
        status: string;
        id: string;
    }>;
    delegate(id: string, payload: any): Promise<{
        status: string;
        id: string;
    }>;
    comment(id: string, payload: any): Promise<{
        status: string;
        id: string;
    }>;
    attachments(id: string, payload: any): Promise<{
        status: string;
        id: string;
    }>;
    getHistory(id: string): Promise<void>;
    getMetrics(id: string): Promise<void>;
}
//# sourceMappingURL=workflow-instance.controller.d.ts.map