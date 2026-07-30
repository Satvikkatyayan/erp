import { TelemetryInterface } from '../contracts/telemetry.interface';
export declare class TelemetryService implements TelemetryInterface {
    private readonly logger;
    incrementCounter(name: string, value: number, tags?: Record<string, string>): void;
    recordHistogram(name: string, value: number, tags?: Record<string, string>): void;
    logInfo(message: string, context?: Record<string, any>): void;
    logError(message: string, error?: Error, context?: Record<string, any>): void;
    private redactPii;
}
//# sourceMappingURL=telemetry.service.d.ts.map