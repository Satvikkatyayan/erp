import { IExecutionContext } from '../interfaces/IExecutionContext';
export declare class JobEnvelope<TPayload> {
    readonly jobId: string;
    readonly worker: string;
    readonly executionContext: IExecutionContext;
    readonly payload: TPayload;
    constructor(jobId: string, worker: string, executionContext: IExecutionContext, payload: TPayload);
}
//# sourceMappingURL=job.envelope.d.ts.map