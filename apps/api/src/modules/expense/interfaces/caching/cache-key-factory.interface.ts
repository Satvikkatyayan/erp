export interface CacheKeyFactory {
  createKey(queryName: string, params: any): string;
}
