export interface RetryPolicyInterface {
    canRetry(attempts: number): boolean;
    computeDelay(attempts: number): number;
}
//# sourceMappingURL=retry-policy.interface.d.ts.map