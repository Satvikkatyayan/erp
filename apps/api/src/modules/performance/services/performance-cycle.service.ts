import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceEvaluationService } from './performance-evaluation.service';
import { PerformanceLockingService } from './performance-locking.service';
import { PerformanceScoringEngine, ScoreTrace } from './performance-scoring.engine';
import { NineBoxService } from './nine-box.service';
import { PerformanceTimelineService } from './performance-timeline.service';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Performance Cycle Service
 * 
 * Top-level orchestrator — mirrors PayrollRunService architecture.
 * Manages the entire performance cycle lifecycle:
 * 
 *   PerformanceCycleService
 *     ↓
 *   PerformanceEvaluationService
 *     ↓
 *   SnapshotService → RatingService → ScoringEngine
 *     ↓
 *   PlatformSDK.rules.evaluate()
 * 
 * Handles:
 *  1. Capture snapshots for all employees
 *  2. Execute scoring engine per employee
 *  3. Generate ratings with weighted scores
 *  4. Apply calibration (if configured)
 *  5. Calculate 9-box placements
 *  6. Generate development recommendations
 *  7. Apply forced distribution (if enabled)
 *  8. Generate bonus/promotion recommendations
 *  9. Lock cycle and publish PerformanceFinalized
 */
@Injectable()
export class PerformanceCycleService {
  private readonly logger = new Logger(PerformanceCycleService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly evaluationService: PerformanceEvaluationService,
    private readonly lockingService: PerformanceLockingService,
    private readonly scoringEngine: PerformanceScoringEngine,
    private readonly nineBoxService: NineBoxService,
    private readonly timeline: PerformanceTimelineService,
  ) {}

  /**
   * Execute the full evaluation cycle for all employees.
   * Mirrors PayrollRunService.captureSnapshotAndCalculate().
   */
  async executeEvaluationCycle(ctx: any, cycleId: string): Promise<void> {
    this.logger.log(`Starting evaluation cycle: ${cycleId}`);

    // Update cycle status
    await this.prisma.perfPerformanceCycle.update({
      where: { id: cycleId },
      data: { status: 'Calibration' },
    });

    // Get all reviews for this cycle
    const reviews = await this.prisma.perfReview.findMany({
      where: { cycleId, tenantId: ctx.tenantId },
    });

    const evaluationResults: Array<{ employeeId: string; score: number; trace: ScoreTrace }> = [];

    // Phase 1: Evaluate each employee
    for (const review of reviews) {
      try {
        const { rating, trace } = await this.evaluationService.evaluateEmployee(
          ctx, cycleId, review.employeeId,
        );

        evaluationResults.push({
          employeeId: review.employeeId,
          score: trace.finalRating,
          trace,
        });
      } catch (err: any) {
        this.logger.error(`Failed to evaluate employee ${review.employeeId}: ${err.message}`);
      }
    }

    // Phase 2: Apply forced distribution (if enabled)
    const cycleConfig = await this.prisma.perfCycleConfiguration.findFirst({
      where: { organizationId: ctx.organizationId, tenantId: ctx.tenantId },
    });

    if (cycleConfig?.forcedDistribution) {
      this.logger.log('Applying forced distribution...');

      // Get distribution policy from Rules SDK
      let distributionPolicy = { top: 20, middle: 60, bottom: 20 };
      try {
        const rulesResult = await this.sdk.rules.evaluate(ctx, 'PERF_FORCED_DISTRIBUTION', {
          organizationId: ctx.organizationId,
        });
        if (rulesResult && (rulesResult as any).top) {
          distributionPolicy = rulesResult as any;
        }
      } catch {
        this.logger.warn('Rules SDK unavailable for forced distribution, using defaults');
      }

      const adjusted = this.scoringEngine.applyForcedDistribution(
        evaluationResults.map(r => ({ employeeId: r.employeeId, score: r.score })),
        distributionPolicy,
      );

      // Update ratings with adjusted scores
      for (const adj of adjusted) {
        if (adj.originalScore !== adj.adjustedScore) {
          await this.prisma.perfRating.updateMany({
            where: { cycleId, employeeId: adj.employeeId, tenantId: ctx.tenantId },
            data: { overallScore: adj.adjustedScore },
          });
        }
      }

      await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.FORCED_DISTRIBUTION_APPLIED, {
        cycleId,
        distributionPolicy,
        adjustedCount: adjusted.filter(a => a.originalScore !== a.adjustedScore).length,
      });
    }

    // Phase 3: Generate bonus recommendations
    if (cycleConfig && (cycleConfig as any).enableBonusRecommendation !== false) {
      for (const result of evaluationResults) {
        const bonusPct = result.trace.bonusRecommendationPct;
        if (bonusPct > 0) {
          const rating = await this.prisma.perfRating.findFirst({
            where: { cycleId, employeeId: result.employeeId, tenantId: ctx.tenantId },
          });
          if (rating) {
            await this.prisma.perfBonusRecommendation.create({
              data: {
                tenantId: ctx.tenantId,
                employeeId: result.employeeId,
                cycleId,
                ratingId: rating.id,
                recommendedPct: bonusPct,
                status: 'Pending',
              },
            });

            await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.BONUS_RECOMMENDED, {
              employeeId: result.employeeId,
              cycleId,
              recommendedPct: bonusPct,
            });
          }
        }
      }
    }

    // Phase 4: Register reporting datasets
    await this.registerAnalyticsDatasets(ctx, cycleId);

    // Phase 5: Index for search
    await this.sdk.search.index(ctx, 'performance-cycles', cycleId, {
      cycleId,
      status: 'Evaluated',
      employeeCount: evaluationResults.length,
    });

    await this.timeline.recordEvent(ctx, cycleId, null, 'EvaluationCycleCompleted', {
      employeeCount: evaluationResults.length,
    });

    this.logger.log(`Evaluation cycle completed: ${evaluationResults.length} employees evaluated`);
  }

  /**
   * Finalize the performance cycle. Locks the cycle and publishes PerformanceFinalized.
   */
  async finalizeCycle(ctx: any, cycleId: string): Promise<void> {
    this.logger.log(`Finalizing cycle: ${cycleId}`);

    // Lock the cycle
    await this.lockingService.lockScope(ctx, cycleId, { level: 'CYCLE' });

    // Update all reviews to Finalized
    await this.prisma.perfReview.updateMany({
      where: { cycleId, tenantId: ctx.tenantId },
      data: { status: 'Finalized' },
    });

    // Update SLA tracking
    const reviews = await this.prisma.perfReview.findMany({
      where: { cycleId, tenantId: ctx.tenantId },
      select: { id: true },
    });
    const reviewIds = reviews.map((r: any) => r.id);

    if (reviewIds.length > 0) {
      await this.prisma.perfReviewSLA.updateMany({
        where: { tenantId: ctx.tenantId, reviewId: { in: reviewIds } },
        data: { finalizedAt: new Date() },
      });
    }

    // Update cycle status
    await this.prisma.perfPerformanceCycle.update({
      where: { id: cycleId },
      data: { status: 'Finalized' },
    });

    // Publish finalization event
    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.PERFORMANCE_FINALIZED, { cycleId });

    await this.timeline.recordEvent(ctx, cycleId, null, 'CycleFinalized', { cycleId });

    this.logger.log(`Cycle ${cycleId} finalized`);
  }

  /**
   * Full simulation of the entire cycle. No DB writes. No events.
   * Returns traces for all employees.
   */
  async simulateCycle(ctx: any, cycleId: string): Promise<Array<{ employeeId: string; trace: ScoreTrace }>> {
    const reviews = await this.prisma.perfReview.findMany({
      where: { cycleId, tenantId: ctx.tenantId },
    });

    const results: Array<{ employeeId: string; trace: ScoreTrace }> = [];

    for (const review of reviews) {
      const trace = await this.evaluationService.simulateEvaluation(ctx, cycleId, review.employeeId);
      results.push({ employeeId: review.employeeId, trace });
    }

    this.logger.log(`Simulation completed for ${results.length} employees`);
    return results;
  }

  /**
   * Register enterprise analytics reporting datasets.
   */
  private async registerAnalyticsDatasets(ctx: any, cycleId: string): Promise<void> {
    const datasets = [
      { name: 'perf_goal_alignment', schema: { cycleId, type: 'goal_alignment' } },
      { name: 'perf_goal_completion_rate', schema: { cycleId, type: 'goal_completion' } },
      { name: 'perf_review_sla', schema: { cycleId, type: 'review_sla' } },
      { name: 'perf_kpi_distribution', schema: { cycleId, type: 'kpi_distribution' } },
      { name: 'perf_rating_distribution', schema: { cycleId, type: 'rating_distribution' } },
      { name: 'perf_calibration_impact', schema: { cycleId, type: 'calibration_impact' } },
      { name: 'perf_high_potential', schema: { cycleId, type: 'high_potential' } },
      { name: 'perf_skill_gap_matrix', schema: { cycleId, type: 'skill_gap' } },
      { name: 'perf_nine_box_matrix', schema: { cycleId, type: 'nine_box' } },
      { name: 'perf_promotion_pipeline', schema: { cycleId, type: 'promotion_pipeline' } },
    ];

    for (const ds of datasets) {
      await this.sdk.reporting.registerDataset(ctx, ds.name, ds.schema);
    }

    this.logger.debug(`Registered ${datasets.length} analytics datasets for cycle ${cycleId}`);
  }
}
