import { IExecutionContext } from '../interfaces/IExecutionContext';
export declare class WorkerFailure {
    readonly errorId: string;
    readonly workerName: string;
    readonly executionContext: IExecutionContext;
    readonly reason: string;
    readonly failedAt: Date;
    readonly stackTrace?: string;
    constructor(errorId: string, workerName: string, executionContext: IExecutionContext, reason: string, failedAt: Date, stackTrace?: string);
}
//# sourceMappingURL=worker.failure.d.ts.map