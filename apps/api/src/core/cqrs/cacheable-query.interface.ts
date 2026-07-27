export interface CacheableQuery {
  getCacheKey(): string;
  getTtl(): number;
}
