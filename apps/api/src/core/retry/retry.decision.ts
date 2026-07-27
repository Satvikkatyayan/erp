export class RetryDecision {
  constructor(
    public readonly shouldRetry: boolean,
    public readonly delayMs: number
  ) {}
}
