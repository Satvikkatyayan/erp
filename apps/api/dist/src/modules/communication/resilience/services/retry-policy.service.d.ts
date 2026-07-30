import { RetryPolicyInterface } from '../contracts/retry-policy.interface';
export declare class RetryPolicyService implements RetryPolicyInterface {
    private readonly maxAttempts;
    private readonly baseDelayMs;
    canRetry(attempts: number): boolean;
    computeDelay(attempts: number): number;
}
//# sourceMappingURL=retry-policy.service.d.ts.map