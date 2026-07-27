import { Injectable } from '@nestjs/common';
import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';

@Injectable()
export class ProjectionRegistry<TEvent> {
  private handlers: Set<ProjectionHandler<TEvent>> = new Set();

  register(handler: ProjectionHandler<TEvent>): void {
    this.handlers.add(handler);
  }

  unregister(handler: ProjectionHandler<TEvent>): void {
    this.handlers.delete(handler);
  }

  async dispatch(event: TEvent): Promise<void> {
    const supportedHandlers = this.getProjection(event);
    for (const handler of supportedHandlers) {
      await handler.project(event);
    }
  }

  getProjection(event: TEvent): ProjectionHandler<TEvent>[] {
    return Array.from(this.handlers).filter(handler => handler.supports(event));
  }

  getAll(): ProjectionHandler<TEvent>[] {
    return Array.from(this.handlers);
  }
}
