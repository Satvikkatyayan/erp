import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceScoringEngine, ScoreTrace } from './performance-scoring.engine';
import { ScoringContext } from './scoring-plugins/scoring-plugin.interface';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Rating Service
 * 
 * Orchestrates the scoring engine to generate PerfRating and PerfWeightedScore entries.
 * Creates PerfScoreTrace for full explainability.
 * Uses snapshot data for deterministic calculation.
 */
@Injectable()
export class RatingService {
  private readonly logger = new Logger(RatingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly scoringEngine: PerformanceScoringEngine,
  ) {}

  /**
   * Generate a rating for an employee in a cycle using snapshot data.
   * Creates PerfRating + PerfWeightedScore + PerfScoreTrace entries.
   */
  async generateRating(ctx: any, cycleId: string, employeeId: string, snapshotData: any): Promise<{ rating: any; trace: ScoreTrace }> {
    this.logger.log(`Generating rating for employee ${employeeId} in cycle ${cycleId}`);

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

    // Execute scoring engine
    const trace = await this.scoringEngine.evaluate(scoringCtx);

    // Idempotency: delete existing rating for this cycle and employee
    await this.prisma.perfWeightedScore.deleteMany({
      where: { rating: { cycleId, employeeId, tenantId: ctx.tenantId } },
    });
    await this.prisma.perfRating.deleteMany({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
    });

    // Create PerfRating
    const ratingLabel = this.getLabelForScore(trace.finalRating);
    const rating = await this.prisma.perfRating.create({
      data: {
        tenantId: ctx.tenantId,
        cycleId,
        employeeId,
        overallScore: trace.finalRating,
        ratingLabel,
      },
    });

    // Create PerfWeightedScore entries for each scoring component
    for (const step of trace.steps) {
      if (step.weight > 0 && step.component !== 'Normalization' && step.component !== 'BonusRecommendation') {
        await this.prisma.perfWeightedScore.create({
          data: {
            tenantId: ctx.tenantId,
            ratingId: rating.id,
            goalAssignmentId: step.component, // Using component name as ref for non-goal scores
            weight: step.weight,
            score: step.rawScore,
            weightedValue: step.weightedScore,
          },
        });
      }
    }

    // Create PerfScoreTrace for explainability
    await this.prisma.perfScoreTrace.create({
      data: {
        tenantId: ctx.tenantId,
        cycleId,
        employeeId,
        ratingId: rating.id,
        traceData: trace.steps as unknown as Prisma.InputJsonValue,
        goalScore: trace.goalScore,
        competencyScore: trace.competencyScore,
        kpiScore: trace.kpiScore,
        attendanceScore: trace.attendanceScore,
        leaveScore: trace.leaveScore,
        weightedTotal: trace.weightedTotal,
        normalizedScore: trace.normalizedScore,
        finalRating: trace.finalRating,
        engineVersion: trace.engineVersion,
        rulesVersion: snapshotData?.rulesEngineVersion || null,
      },
    });

    // Publish event
    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.SCORE_CALCULATED, {
      ratingId: rating.id,
      cycleId,
      employeeId,
      overallScore: trace.finalRating,
      ratingLabel,
    });

    this.logger.log(`Rating generated: ${rating.id}, score=${trace.finalRating}, label=${ratingLabel}`);
    return { rating, trace };
  }

  /**
   * Map a numeric score to a rating label.
   */
  private getLabelForScore(score: number): string {
    if (score >= 90) return 'Exceptional';
    if (score >= 80) return 'Exceeds Expectations';
    if (score >= 70) return 'Meets Expectations';
    if (score >= 60) return 'Needs Improvement';
    return 'Below Expectations';
  }
}
