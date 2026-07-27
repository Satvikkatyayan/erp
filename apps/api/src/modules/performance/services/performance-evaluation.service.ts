import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceSnapshotService } from './performance-snapshot.service';
import { RatingService } from './rating.service';
import { PerformanceScoringEngine, ScoreTrace } from './performance-scoring.engine';
import { CalibrationService } from './calibration.service';
import { NineBoxService } from './nine-box.service';
import { DevelopmentRecommendationService } from './development-recommendation.service';
import { ReviewSnapshotService } from './review-snapshot.service';
import { PerformanceTimelineService } from './performance-timeline.service';
import { ScoringContext } from './scoring-plugins/scoring-plugin.interface';

/**
 * Performance Evaluation Service
 * 
 * Intermediate orchestration layer between PerformanceCycleService and lower services.
 * Handles per-employee evaluation logic:
 *   Snapshot → Scoring → Rating → Calibration → 9-Box → Recommendations → Review Snapshot
 * 
 * This separation keeps cycle orchestration separate from employee evaluation logic.
 */
@Injectable()
export class PerformanceEvaluationService {
  private readonly logger = new Logger(PerformanceEvaluationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly snapshotService: PerformanceSnapshotService,
    private readonly ratingService: RatingService,
    private readonly scoringEngine: PerformanceScoringEngine,
    private readonly calibrationService: CalibrationService,
    private readonly nineBoxService: NineBoxService,
    private readonly devRecommendationService: DevelopmentRecommendationService,
    private readonly reviewSnapshotService: ReviewSnapshotService,
    private readonly timeline: PerformanceTimelineService,
  ) {}

  /**
   * Evaluate a single employee for a cycle.
   * Full pipeline: Snapshot → Rating → Review Snapshot → Recommendations
   */
  async evaluateEmployee(ctx: any, cycleId: string, employeeId: string): Promise<{
    snapshot: any;
    rating: any;
    trace: ScoreTrace;
  }> {
    this.logger.log(`Evaluating employee ${employeeId} in cycle ${cycleId}`);

    // Step 1: Capture snapshot (idempotent)
    const snapshot = await this.snapshotService.captureSnapshot(ctx, cycleId, employeeId);
    const snapshotData = snapshot.snapshotData as any;

    // Step 2: Generate rating via scoring engine
    const { rating, trace } = await this.ratingService.generateRating(
      ctx, cycleId, employeeId, snapshotData,
    );

    // Step 3: Generate development recommendations
    await this.devRecommendationService.generateRecommendations(ctx, cycleId, employeeId);

    // Step 4: Create review snapshot (outputs)
    const review = await this.prisma.perfReview.findFirst({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
    });
    if (review) {
      await this.reviewSnapshotService.captureSnapshot(ctx, {
        cycleId,
        employeeId,
        reviewId: review.id,
        snapshotType: 'FINALIZED',
      });
    }

    await this.timeline.recordEvent(ctx, cycleId, employeeId, 'EmployeeEvaluated', {
      ratingId: rating.id,
      score: trace.finalRating,
    });

    this.logger.log(`Employee ${employeeId} evaluated: score=${trace.finalRating}`);
    return { snapshot, rating, trace };
  }

  /**
   * Simulate evaluation without persisting. Pure dry-run.
   * No DB writes. No events. No timeline. No audit.
   */
  async simulateEvaluation(ctx: any, cycleId: string, employeeId: string): Promise<ScoreTrace> {
    this.logger.log(`Simulating evaluation for employee ${employeeId} in cycle ${cycleId}`);

    // Get snapshot (read-only — use existing or build from current data)
    const snapshot = await this.prisma.perfPerformanceSnapshot.findFirst({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
    });

    const snapshotData = snapshot?.snapshotData || {};

    // Get cycle configuration
    const cycleConfig = await this.prisma.perfCycleConfiguration.findFirst({
      where: { organizationId: ctx.organizationId, tenantId: ctx.tenantId },
    });

    const scoringCtx: ScoringContext = {
      tenantId: ctx.tenantId,
      organizationId: ctx.organizationId,
      cycleId,
      employeeId,
      snapshotData,
      cycleConfig: cycleConfig || {},
      featureFlags: ctx.featureFlags || {},
    };

    // Pure simulation — no side effects
    return this.scoringEngine.simulate(scoringCtx);
  }

  /**
   * Process nine-box placement for an employee after evaluation.
   */
  async processNineBox(ctx: any, cycleId: string, employeeId: string): Promise<any> {
    return this.nineBoxService.calculatePlacement(ctx, cycleId, employeeId);
  }

  /**
   * Process calibration for an employee's rating.
   */
  async processCalibration(ctx: any, ratingId: string, calibratedScore: number, stage: string, reason?: string): Promise<any> {
    return this.calibrationService.calibrateRating(ctx, {
      ratingId,
      calibratedScore,
      reason,
      stage,
    });
  }
}
