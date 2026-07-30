export interface RetryPolicyInterface {
  canRetry(attempts: number): boolean;
  computeDelay(attempts: number): number;
}
