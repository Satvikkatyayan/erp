import { ApprovalState } from './approval-state.enum';
export declare class ApprovalRuntimeState {
    readonly approvalId: string;
    private _state;
    constructor(approvalId: string, initialState?: ApprovalState);
    get state(): ApprovalState;
    transitionTo(newState: ApprovalState): void;
}
//# sourceMappingURL=approval-runtime-state.d.ts.map