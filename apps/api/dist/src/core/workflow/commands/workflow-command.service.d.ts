export declare class WorkflowCommandService {
    startInstance(definitionId: string, entityId: string, payload: any): Promise<void>;
    cancelInstance(instanceId: string, reason: string): Promise<void>;
    completeTask(taskId: string, payload: any): Promise<void>;
}
//# sourceMappingURL=workflow-command.service.d.ts.map