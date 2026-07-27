export declare enum HealthStatus {
    UP = "UP",
    DOWN = "DOWN",
    DEGRADED = "DEGRADED",
    UNKNOWN = "UNKNOWN"
}
export interface HealthReport {
    status: HealthStatus;
    details?: Record<string, any>;
    error?: string;
    timestamp: Date;
}
export interface HealthContributor {
    name: string;
    checkHealth(): Promise<HealthReport>;
}
//# sourceMappingURL=health.contracts.d.ts.map