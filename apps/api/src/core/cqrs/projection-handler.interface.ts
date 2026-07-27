export interface ProjectionHandler<TEvent> {
  supports(event: TEvent): boolean;
  project(event: TEvent): Promise<void>;
}
