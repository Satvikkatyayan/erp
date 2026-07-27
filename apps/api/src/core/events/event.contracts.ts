export interface DomainEvent<TPayload = any> {
  eventId: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;

  tenantId: string;
  organizationId: string;

  correlationId: string;
  causationId?: string;

  occurredAt: Date;
  version: number;

  payload: TPayload;
}

export interface EventMetadata {
  timestamp: Date;
  source: string;
}

export interface EventPublisher {
  publish(event: DomainEvent<any>): Promise<void>;
  publishBatch(events: DomainEvent<any>[]): Promise<void>;
}

export interface EventSubscriber<TPayload = any> {
  handle(event: DomainEvent<TPayload>): Promise<void>;
}
