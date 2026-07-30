import { Injectable, Logger } from '@nestjs/common';
import { TelemetryInterface } from '../contracts/telemetry.interface';

@Injectable()
export class TelemetryService implements TelemetryInterface {
  private readonly logger = new Logger(TelemetryService.name);

  incrementCounter(name: string, value: number, tags?: Record<string, string>): void {
    // In a real implementation, this forwards to Prometheus, Datadog, etc.
    this.logger.log(`[Metric: Counter] ${name} += ${value} | Tags: ${JSON.stringify(tags || {})}`);
  }

  recordHistogram(name: string, value: number, tags?: Record<string, string>): void {
    // Forward to infra sinks
    this.logger.log(`[Metric: Histogram] ${name} = ${value} | Tags: ${JSON.stringify(tags || {})}`);
  }

  logInfo(message: string, context?: Record<string, any>): void {
    const safeContext = this.redactPii(context);
    this.logger.log(`${message} | Context: ${JSON.stringify(safeContext)}`);
  }

  logError(message: string, error?: Error, context?: Record<string, any>): void {
    const safeContext = this.redactPii(context);
    this.logger.error(`${message} | Context: ${JSON.stringify(safeContext)}`, error?.stack);
  }

  private redactPii(context?: Record<string, any>): Record<string, any> {
    if (!context) return {};
    
    // Simple naive redaction to satisfy the contract
    const redacted = { ...context };
    if (redacted.recipient) {
      redacted.recipient = '***REDACTED***';
    }
    return redacted;
  }
}
