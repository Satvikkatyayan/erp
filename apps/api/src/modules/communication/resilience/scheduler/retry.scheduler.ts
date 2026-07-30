import { Injectable } from '@nestjs/common';
import { RetryOrchestrator } from '../orchestrator/retry.orchestrator';

@Injectable()
export class RetryScheduler {
  constructor(private readonly orchestrator: RetryOrchestrator) {}

  async scheduleRetry(correlationId: string, tenantId: string, channel: string, delayMs: number): Promise<void> {
    // Generate an immutable attempt identifier for this new execution
    const attemptId = `retry-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    
    // Non-blocking delay
    setTimeout(() => {
      this.orchestrator.executeRetry(correlationId, tenantId, channel, attemptId)
        .catch(err => {
          // Failures in the orchestrator must remain isolated and never crash the process
          console.error(`Isolated orchestrator failure for ${correlationId}`, err);
        });
    }, delayMs);
  }
}
