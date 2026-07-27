export interface PlatformResult<T> {
  success: boolean;
  data: T;
  metadata?: any;
  warnings?: string[];
  executionTimeMs: number;
  correlationId: string;
}