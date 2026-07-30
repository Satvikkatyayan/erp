import { WorkflowState } from './workflow-state.enum';
import { WorkflowActivity } from './workflow-activity';
export declare class WorkflowRuntimeState {
    readonly workflowId: string;
    private _state;
    private readonly _activityHistory;
    constructor(workflowId: string, initialState?: WorkflowState);
    get state(): WorkflowState;
    get activityHistory(): ReadonlyArray<WorkflowActivity>;
    transitionTo(newState: WorkflowState): void;
    addActivity(activity: WorkflowActivity): void;
}
//# sourceMappingURL=workflow-runtime-state.d.ts.map