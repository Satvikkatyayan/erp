export class WorkerException extends Error {
  constructor(
    public readonly workerName: string,
    message: string,
    public readonly originalError?: any
  ) {
    super(message);
    this.name = 'WorkerException';
  }
}
