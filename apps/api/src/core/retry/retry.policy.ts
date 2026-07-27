import { IRetryPolicy } from '../execution/interfaces/IRetryPolicy';
import { RetryDecision } from './retry.decision';

export class RetryPolicy implements IRetryPolicy {
  constructor(
    private readonly maxRetries: number,
    private readonly baseDelayMs: number,
    private readonly strategy: 'IMMEDIATE' | 'EXPONENTIAL' | 'FIXED' | 'NEVER'
  ) {}

  shouldRetry(retryCount: number, error: any): boolean {
    if (this.strategy === 'NEVER') return false;
    return retryCount < this.maxRetries;
  }

  getDelayMs(retryCount: number): number {
    switch (this.strategy) {
      case 'IMMEDIATE':
      case 'NEVER':
        return 0;
      case 'FIXED':
        return this.baseDelayMs;
      case 'EXPONENTIAL':
        return this.baseDelayMs * Math.pow(2, retryCount);
      default:
        return this.baseDelayMs;
    }
  }

  evaluate(retryCount: number, error: any): RetryDecision {
    return new RetryDecision(
      this.shouldRetry(retryCount, error),
      this.getDelayMs(retryCount)
    );
  }
}
