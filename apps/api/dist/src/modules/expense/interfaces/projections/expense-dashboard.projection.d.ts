import { ReadModelVersion } from '../../../../core/cqrs/read-model-version.interface';
export interface ExpenseDashboardProjection extends ReadModelVersion {
    totalPendingApprovals: number;
    totalApprovedThisMonth: number;
    recentClaims: any[];
}
//# sourceMappingURL=expense-dashboard.projection.d.ts.map