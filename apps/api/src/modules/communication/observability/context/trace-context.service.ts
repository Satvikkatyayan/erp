import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export interface TraceContext {
  correlationId: string;
}

@Injectable()
export class TraceContextService {
  private readonly als = new AsyncLocalStorage<TraceContext>();

  runWithContext<T>(context: TraceContext, fn: () => T): T {
    return this.als.run(context, fn);
  }

  getCorrelationId(): string | undefined {
    return this.als.getStore()?.correlationId;
  }
}
