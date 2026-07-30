import { ApprovalState } from './approval-state.enum';
export declare class ApprovalHistoryEvent {
    readonly timestamp: Date;
    readonly state: ApprovalState;
    readonly payload?: any;
    constructor(timestamp: Date, state: ApprovalState, payload?: any);
}
export declare class ApprovalHistory {
    readonly approvalId: string;
    private readonly _events;
    constructor(approvalId: string);
    get events(): ReadonlyArray<ApprovalHistoryEvent>;
    append(event: ApprovalHistoryEvent): void;
}
//# sourceMappingURL=approval-history.d.ts.map