import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';
export declare class ApprovalProjectionService<TEvent> implements ProjectionHandler<TEvent> {
    supports(event: TEvent): boolean;
    project(event: TEvent): Promise<void>;
}
//# sourceMappingURL=approval-projection.service.d.ts.map