export interface TelemetryInterface {
  incrementCounter(name: string, value: number, tags?: Record<string, string>): void;
  recordHistogram(name: string, value: number, tags?: Record<string, string>): void;
  logInfo(message: string, context?: Record<string, any>): void;
  logError(message: string, error?: Error, context?: Record<string, any>): void;
}
