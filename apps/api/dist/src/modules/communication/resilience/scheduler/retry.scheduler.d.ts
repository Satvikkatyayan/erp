import { RetryOrchestrator } from '../orchestrator/retry.orchestrator';
export declare class RetryScheduler {
    private readonly orchestrator;
    constructor(orchestrator: RetryOrchestrator);
    scheduleRetry(correlationId: string, tenantId: string, channel: string, delayMs: number): Promise<void>;
}
//# sourceMappingURL=retry.scheduler.d.ts.map