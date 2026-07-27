export interface IRetryPolicy {
    shouldRetry(retryCount: number, error: any): boolean;
    getDelayMs(retryCount: number): number;
}
//# sourceMappingURL=IRetryPolicy.d.ts.map