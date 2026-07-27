export interface IPlatformMetrics {
    engine: string;
    version: string;
    uptime: number;
    requestCount: number;
    errorCount: number;
    averageLatency: number;
    queueDepth?: number;
    cacheHitRate?: number;
    healthStatus: "HEALTHY" | "DEGRADED" | "UNAVAILABLE";
}
//# sourceMappingURL=metrics.interface.d.ts.map