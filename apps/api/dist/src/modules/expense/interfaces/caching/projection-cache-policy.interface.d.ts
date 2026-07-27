export interface ProjectionCachePolicy {
    shouldCache(projectionName: string): boolean;
    getInvalidationEvents(projectionName: string): string[];
}
//# sourceMappingURL=projection-cache-policy.interface.d.ts.map