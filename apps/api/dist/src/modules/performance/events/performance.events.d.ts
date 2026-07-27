export declare const PERFORMANCE_EVENTS: {
    readonly SNAPSHOT_CREATED: "PerformanceSnapshotCreated";
    readonly REVIEW_SNAPSHOT_CREATED: "ReviewSnapshotCreated";
    readonly GOAL_VERSION_CREATED: "GoalVersionCreated";
    readonly GOAL_COMPLETED: "GoalCompleted";
    readonly GOAL_DEPENDENCY_CREATED: "GoalDependencyCreated";
    readonly REVIEW_TEMPLATE_ASSIGNED: "ReviewTemplateAssigned";
    readonly REVIEW_TEMPLATE_VERSION_ACTIVATED: "ReviewTemplateVersionActivated";
    readonly KPI_COMPLETED: "KPICompleted";
    readonly SCORE_CALCULATED: "ScoreCalculated";
    readonly SCORE_NORMALIZED: "ScoreNormalized";
    readonly FORCED_DISTRIBUTION_APPLIED: "ForcedDistributionApplied";
    readonly SIMULATION_EXECUTED: "SimulationExecuted";
    readonly CALIBRATION_COMPLETED: "CalibrationCompleted";
    readonly PERFORMANCE_FINALIZED: "PerformanceFinalized";
    readonly REVIEW_REOPENED: "ReviewReopened";
    readonly DEVELOPMENT_RECOMMENDATION_GENERATED: "DevelopmentRecommendationGenerated";
    readonly BONUS_RECOMMENDED: "BonusRecommended";
    readonly PROMOTION_RECOMMENDED: "PromotionRecommended";
    readonly TALENT_POOL_ASSIGNED: "TalentPoolAssigned";
    readonly NINE_BOX_PLACEMENT_CALCULATED: "NineBoxPlacementCalculated";
};
export type PerformanceEventName = typeof PERFORMANCE_EVENTS[keyof typeof PERFORMANCE_EVENTS];
//# sourceMappingURL=performance.events.d.ts.map