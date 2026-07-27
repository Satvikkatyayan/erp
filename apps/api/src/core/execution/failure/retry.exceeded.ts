import { WorkerException } from './worker.exception';

export class RetryExceededException extends WorkerException {
  constructor(workerName: string, message: string, originalError?: any) {
    super(workerName, message, originalError);
    this.name = 'RetryExceededException';
  }
}
