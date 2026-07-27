export declare class ProjectionHealthService {
    getLag(): Promise<number>;
    getFailedEventsCount(): Promise<number>;
    getReplayProgress(): Promise<number>;
    getStaleProjections(): Promise<string[]>;
    getCacheAge(): Promise<number>;
    getProcessingThroughput(): Promise<number>;
    getAverageRebuildDuration(): Promise<number>;
    getQueueDepth(): Promise<number>;
}
//# sourceMappingURL=projection-health.service.d.ts.map