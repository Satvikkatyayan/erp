import { ApprovalState } from './approval-state.enum';

export class ApprovalHistoryEvent {
  constructor(
    public readonly timestamp: Date,
    public readonly state: ApprovalState,
    public readonly payload?: any
  ) {
    Object.freeze(this);
  }
}

export class ApprovalHistory {
  private readonly _events: ApprovalHistoryEvent[] = [];

  constructor(public readonly approvalId: string) {}

  get events(): ReadonlyArray<ApprovalHistoryEvent> {
    return Object.freeze([...this._events]);
  }

  append(event: ApprovalHistoryEvent): void {
    this._events.push(event);
  }
}
