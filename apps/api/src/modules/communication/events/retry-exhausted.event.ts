export class RetryExhaustedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly attemptsMade: number,
    public readonly finalErrorCode: string
  ) {}
}
