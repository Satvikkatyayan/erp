import { Context } from '../../context/context.interface';

export interface IExecutionContext extends Context {
  causationId?: string;
  occurredAt: Date;
  retryCount: number;
  metadata?: Record<string, any>;
}
