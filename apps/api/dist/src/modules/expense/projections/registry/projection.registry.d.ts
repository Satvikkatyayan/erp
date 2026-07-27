import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';
export declare class ProjectionRegistry<TEvent> {
    private handlers;
    register(handler: ProjectionHandler<TEvent>): void;
    unregister(handler: ProjectionHandler<TEvent>): void;
    dispatch(event: TEvent): Promise<void>;
    getProjection(event: TEvent): ProjectionHandler<TEvent>[];
    getAll(): ProjectionHandler<TEvent>[];
}
//# sourceMappingURL=projection.registry.d.ts.map