import { IExecutionContext } from '../interfaces/IExecutionContext';

export class WorkerFailure {
  constructor(
    public readonly errorId: string,
    public readonly workerName: string,
    public readonly executionContext: IExecutionContext,
    public readonly reason: string,
    public readonly failedAt: Date,
    public readonly stackTrace?: string
  ) {}
}
