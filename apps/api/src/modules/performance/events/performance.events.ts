// ================================================================
// Performance Management — Domain Event Constants
// ================================================================
// All events are published via PlatformSDK.events.publish()
// and persisted in the OutboxMessage table for reliable delivery.
// ================================================================

export const PERFORMANCE_EVENTS = {
  // --- Snapshot Events ---
  SNAPSHOT_CREATED: 'PerformanceSnapshotCreated',
  REVIEW_SNAPSHOT_CREATED: 'ReviewSnapshotCreated',

  // --- Goal Events ---
  GOAL_VERSION_CREATED: 'GoalVersionCreated',
  GOAL_COMPLETED: 'GoalCompleted',
  GOAL_DEPENDENCY_CREATED: 'GoalDependencyCreated',

  // --- Review Template Events ---
  REVIEW_TEMPLATE_ASSIGNED: 'ReviewTemplateAssigned',
  REVIEW_TEMPLATE_VERSION_ACTIVATED: 'ReviewTemplateVersionActivated',

  // --- KPI Events ---
  KPI_COMPLETED: 'KPICompleted',

  // --- Scoring Events ---
  SCORE_CALCULATED: 'ScoreCalculated',
  SCORE_NORMALIZED: 'ScoreNormalized',
  FORCED_DISTRIBUTION_APPLIED: 'ForcedDistributionApplied',
  SIMULATION_EXECUTED: 'SimulationExecuted',

  // --- Calibration Events ---
  CALIBRATION_COMPLETED: 'CalibrationCompleted',

  // --- Lifecycle Events ---
  PERFORMANCE_FINALIZED: 'PerformanceFinalized',
  REVIEW_REOPENED: 'ReviewReopened',

  // --- Recommendation Events ---
  DEVELOPMENT_RECOMMENDATION_GENERATED: 'DevelopmentRecommendationGenerated',
  BONUS_RECOMMENDED: 'BonusRecommended',
  PROMOTION_RECOMMENDED: 'PromotionRecommended',

  // --- Succession Events ---
  TALENT_POOL_ASSIGNED: 'TalentPoolAssigned',
  NINE_BOX_PLACEMENT_CALCULATED: 'NineBoxPlacementCalculated',
} as const;

export type PerformanceEventName = typeof PERFORMANCE_EVENTS[keyof typeof PERFORMANCE_EVENTS];
