import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';
export declare class ExpenseProjectionService<TEvent> implements ProjectionHandler<TEvent> {
    supports(event: TEvent): boolean;
    project(event: TEvent): Promise<void>;
}
//# sourceMappingURL=expense-projection.service.d.ts.map