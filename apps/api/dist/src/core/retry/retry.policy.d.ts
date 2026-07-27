import { IRetryPolicy } from '../execution/interfaces/IRetryPolicy';
import { RetryDecision } from './retry.decision';
export declare class RetryPolicy implements IRetryPolicy {
    private readonly maxRetries;
    private readonly baseDelayMs;
    private readonly strategy;
    constructor(maxRetries: number, baseDelayMs: number, strategy: 'IMMEDIATE' | 'EXPONENTIAL' | 'FIXED' | 'NEVER');
    shouldRetry(retryCount: number, error: any): boolean;
    getDelayMs(retryCount: number): number;
    evaluate(retryCount: number, error: any): RetryDecision;
}
//# sourceMappingURL=retry.policy.d.ts.map