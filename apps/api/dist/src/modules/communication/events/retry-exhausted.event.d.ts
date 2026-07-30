export declare class RetryExhaustedEvent {
    readonly correlationId: string;
    readonly attemptsMade: number;
    readonly finalErrorCode: string;
    constructor(correlationId: string, attemptsMade: number, finalErrorCode: string);
}
//# sourceMappingURL=retry-exhausted.event.d.ts.map