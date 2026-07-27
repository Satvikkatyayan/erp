import { ReadModelVersion } from '../../../../core/cqrs/read-model-version.interface';
export interface BudgetProjection extends ReadModelVersion {
    departmentId: string;
    overallUtilization: number;
    atRiskCategories: string[];
}
//# sourceMappingURL=budget.projection.d.ts.map