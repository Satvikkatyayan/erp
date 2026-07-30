import { Injectable } from '@nestjs/common';
import { RetryPolicyInterface } from '../contracts/retry-policy.interface';

@Injectable()
export class RetryPolicyService implements RetryPolicyInterface {
  private readonly maxAttempts = 3;
  private readonly baseDelayMs = 1000;

  canRetry(attempts: number): boolean {
    return attempts < this.maxAttempts;
  }

  computeDelay(attempts: number): number {
    return this.baseDelayMs * Math.pow(2, attempts);
  }
}
