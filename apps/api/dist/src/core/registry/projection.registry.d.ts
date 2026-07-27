import { AbstractRegistry } from './abstract.registry';
import { ProjectionHandler } from '../cqrs/projection-handler.interface';
export declare class ProjectionRegistry<TEvent = any> extends AbstractRegistry<ProjectionHandler<TEvent>> {
    protected supportsMultipleItemsPerKey(): boolean;
    project(projectionType: string, event: TEvent): Promise<void>;
}
//# sourceMappingURL=projection.registry.d.ts.map