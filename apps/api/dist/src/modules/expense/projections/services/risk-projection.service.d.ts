import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';
export declare class RiskProjectionService<TEvent> implements ProjectionHandler<TEvent> {
    supports(event: TEvent): boolean;
    project(event: TEvent): Promise<void>;
}
//# sourceMappingURL=risk-projection.service.d.ts.map