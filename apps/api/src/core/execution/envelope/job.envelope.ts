import { IExecutionContext } from '../interfaces/IExecutionContext';

export class JobEnvelope<TPayload> {
  constructor(
    public readonly jobId: string,
    public readonly worker: string,
    public readonly executionContext: IExecutionContext,
    public readonly payload: TPayload
  ) {}
}
