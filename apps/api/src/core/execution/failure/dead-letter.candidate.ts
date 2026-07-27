import { IExecutionContext } from '../interfaces/IExecutionContext';

export class DeadLetterCandidate {
  constructor(
    public readonly jobId: string,
    public readonly workerName: string,
    public readonly executionContext: IExecutionContext,
    public readonly payload: any,
    public readonly lastError: string,
    public readonly failedAt: Date
  ) {}
}
