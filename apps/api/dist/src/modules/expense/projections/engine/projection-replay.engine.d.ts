export declare class ProjectionReplayEngine {
    rebuildProjections(): Promise<void>;
    rebuildProjection(projectionName: string): Promise<void>;
    replayEvents(): Promise<void>;
    replayFromEvent(eventId: string): Promise<void>;
    replayRange(start: string, end: string): Promise<void>;
    rebuildEmployee(employeeId: string): Promise<void>;
    rebuildDepartment(departmentId: string): Promise<void>;
    rebuildEverything(): Promise<void>;
}
//# sourceMappingURL=projection-replay.engine.d.ts.map