export interface ProjectionCachePolicy {
  shouldCache(projectionName: string): boolean;
  getInvalidationEvents(projectionName: string): string[];
}
