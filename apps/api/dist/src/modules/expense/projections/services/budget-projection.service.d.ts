import { ProjectionHandler } from '../../../../core/cqrs/projection-handler.interface';
export declare class BudgetProjectionService<TEvent> implements ProjectionHandler<TEvent> {
    supports(event: TEvent): boolean;
    project(event: TEvent): Promise<void>;
}
//# sourceMappingURL=budget-projection.service.d.ts.map