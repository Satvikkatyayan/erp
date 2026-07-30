import { WorkflowState } from './workflow-state.enum';
import { WorkflowActivity } from './workflow-activity';

export class WorkflowRuntimeState {
  private _state: WorkflowState;
  private readonly _activityHistory: WorkflowActivity[] = [];

  constructor(
    public readonly workflowId: string,
    initialState: WorkflowState = WorkflowState.CREATED
  ) {
    this._state = initialState;
  }

  get state(): WorkflowState {
    return this._state;
  }

  get activityHistory(): ReadonlyArray<WorkflowActivity> {
    return Object.freeze([...this._activityHistory]);
  }

  transitionTo(newState: WorkflowState): void {
    this._state = newState;
  }

  addActivity(activity: WorkflowActivity): void {
    this._activityHistory.push(activity);
  }
}
