// ================================================================
// Scoring Plugin Interface
// ================================================================
// Each plugin evaluates one dimension of performance and returns
// a ScoringResult. The engine orchestrates plugins in sequence.
// ================================================================

export interface ScoringResult {
  /** Plugin name / component identifier */
  component: string;
  /** Raw score before weighting (0-100 scale) */
  rawScore: number;
  /** Weight assigned to this component (0-1) */
  weight: number;
  /** rawScore * weight */
  weightedScore: number;
  /** Additional metadata for the score trace */
  metadata?: Record<string, any>;
}

export interface ScoringContext {
  tenantId: string;
  organizationId: string;
  cycleId: string;
  employeeId: string;
  /** The full snapshot data (inputs) */
  snapshotData: any;
  /** Cycle configuration */
  cycleConfig: any;
  /** Feature flags from PlatformContext */
  featureFlags: Record<string, boolean>;
}

export interface ScoringPlugin {
  /** Unique name for this plugin */
  readonly name: string;

  /** Execution order (lower = earlier) */
  readonly order: number;

  /**
   * Whether this plugin should execute given the current context.
   * E.g., AttendancePlugin checks if PERF_INCLUDE_ATTENDANCE is enabled.
   */
  isApplicable(ctx: ScoringContext): boolean;

  /**
   * Evaluate this scoring dimension.
   * Must be a pure function of the snapshot data — no DB reads.
   */
  evaluate(ctx: ScoringContext): Promise<ScoringResult>;
}
