import { IExecutionContext } from '../interfaces/IExecutionContext';
export declare class DeadLetterCandidate {
    readonly jobId: string;
    readonly workerName: string;
    readonly executionContext: IExecutionContext;
    readonly payload: any;
    readonly lastError: string;
    readonly failedAt: Date;
    constructor(jobId: string, workerName: string, executionContext: IExecutionContext, payload: any, lastError: string, failedAt: Date);
}
//# sourceMappingURL=dead-letter.candidate.d.ts.map