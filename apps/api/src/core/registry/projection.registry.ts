import { Injectable } from '@nestjs/common';
import { AbstractRegistry } from './abstract.registry';
import { ProjectionHandler } from '../cqrs/projection-handler.interface';

@Injectable()
export class ProjectionRegistry<TEvent = any> extends AbstractRegistry<ProjectionHandler<TEvent>> {
  protected supportsMultipleItemsPerKey(): boolean {
    return false; // One primary handler per projection type
  }

  async project(projectionType: string, event: TEvent): Promise<void> {
    const handler = this.get(projectionType);
    if (!handler) return;
    await handler.project(event);
  }
}
