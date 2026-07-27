export interface EventSubscriber {
  subscribe(): void;
  unsubscribe(): void;
}