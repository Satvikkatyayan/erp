export class ExecutionResult<T> {
  aggregate: T;
  events: any[];
  metadata?: Record<string, any>;

  constructor(aggregate: T, events: any[] = [], metadata?: Record<string, any>) {
    this.aggregate = aggregate;
    this.events = events;
    this.metadata = metadata;
  }
}
