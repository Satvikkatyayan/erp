import { WorkflowQueryService } from '../queries/workflow-query.service';
export declare class WorkflowTaskController {
    private readonly queryService;
    constructor(queryService: WorkflowQueryService);
    getTasks(userId: string): Promise<void>;
}
//# sourceMappingURL=workflow-task.controller.d.ts.map