export class RetryScheduledEvent {
  constructor(
    public readonly correlationId: string,
    public readonly attempt: number,
    public readonly delayMs: number
  ) {}
}
