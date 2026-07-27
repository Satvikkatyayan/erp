export declare class ProjectionMetadataService {
    getProjectionVersion(projectionId: string): Promise<number>;
    getReplayTimestamp(projectionId: string): Promise<Date | null>;
    getRebuildStatus(projectionId: string): Promise<string>;
    getLastProcessedEvent(projectionId: string): Promise<string | null>;
    getProjectionStatistics(projectionId: string): Promise<any>;
}
//# sourceMappingURL=projection-metadata.service.d.ts.map