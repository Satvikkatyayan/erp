import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';
export declare class TravelProjectionService<TEvent> implements ProjectionHandler<TEvent> {
    supports(event: TEvent): boolean;
    project(event: TEvent): Promise<void>;
}
//# sourceMappingURL=travel-projection.service.d.ts.map