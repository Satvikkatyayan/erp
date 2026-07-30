import { ApprovalState } from './approval-state.enum';

export class ApprovalRuntimeState {
  private _state: ApprovalState;

  constructor(
    public readonly approvalId: string,
    initialState: ApprovalState = ApprovalState.CREATED
  ) {
    this._state = initialState;
  }

  get state(): ApprovalState {
    return this._state;
  }

  transitionTo(newState: ApprovalState): void {
    this._state = newState;
  }
}
