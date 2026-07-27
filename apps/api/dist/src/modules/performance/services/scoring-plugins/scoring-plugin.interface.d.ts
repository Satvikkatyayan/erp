export interface ScoringResult {
    component: string;
    rawScore: number;
    weight: number;
    weightedScore: number;
    metadata?: Record<string, any>;
}
export interface ScoringContext {
    tenantId: string;
    organizationId: string;
    cycleId: string;
    employeeId: string;
    snapshotData: any;
    cycleConfig: any;
    featureFlags: Record<string, boolean>;
}
export interface ScoringPlugin {
    readonly name: string;
    readonly order: number;
    isApplicable(ctx: ScoringContext): boolean;
    evaluate(ctx: ScoringContext): Promise<ScoringResult>;
}
//# sourceMappingURL=scoring-plugin.interface.d.ts.map