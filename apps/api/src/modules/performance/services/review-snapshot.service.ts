import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Review Snapshot Service
 * 
 * Captures the OUTPUT state of a review when finalized.
 * 
 * Separate from PerformanceSnapshotService (which captures INPUTS):
 *   Performance Snapshot = Inputs (employee, goals, KPIs, competencies, config)
 *   Review Snapshot = Outputs (scores, ratings, comments, calibration)
 * 
 * Exactly like Payroll: Inputs → Calculation → Outputs
 */
@Injectable()
export class ReviewSnapshotService {
  private readonly logger = new Logger(ReviewSnapshotService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
  ) {}

  /**
   * Capture a review snapshot when the review is finalized.
   */
  async captureSnapshot(ctx: any, data: {
    cycleId: string;
    employeeId: string;
    reviewId: string;
    snapshotType?: string;
  }): Promise<any> {
    // Gather all review output data
    const review = await this.prisma.perfReview.findFirst({
      where: { id: data.reviewId, tenantId: ctx.tenantId },
      include: {
        versions: { orderBy: { versionNumber: 'desc' }, take: 1 },
        participants: true,
        comments: true,
        competencyRatings: true,
      },
    });

    if (!review) throw new Error('Review not found');

    // Get rating and score trace
    const rating = await this.prisma.perfRating.findFirst({
      where: { cycleId: data.cycleId, employeeId: data.employeeId, tenantId: ctx.tenantId },
      include: { weightedScores: true, calibration: true },
    });

    const scoreTrace = await this.prisma.perfScoreTrace.findFirst({
      where: { cycleId: data.cycleId, employeeId: data.employeeId, tenantId: ctx.tenantId },
      orderBy: { createdAt: 'desc' },
    });

    // Build snapshot data
    const reviewData = {
      reviewId: review.id,
      status: review.status,
      templateVersionId: review.templateVersionId,
      latestVersion: review.versions[0] || null,
      participants: review.participants.map((p: any) => ({
        participantId: p.participantId,
        reviewType: p.reviewType,
        status: p.status,
        ratingGiven: p.ratingGiven,
        submittedAt: p.submittedAt,
      })),
      comments: review.comments.map((c: any) => ({
        authorId: c.authorId,
        content: c.content,
        createdAt: c.createdAt,
      })),
      competencyRatings: review.competencyRatings.map((r: any) => ({
        competencyId: r.competencyId,
        ratedById: r.ratedById,
        rating: r.rating,
      })),
      rating: rating ? {
        overallScore: rating.overallScore,
        ratingLabel: rating.ratingLabel,
        weightedScores: rating.weightedScores,
        calibration: rating.calibration ? {
          originalScore: rating.calibration.originalScore,
          calibratedScore: rating.calibration.calibratedScore,
          reason: rating.calibration.reason,
        } : null,
      } : null,
    };

    const snapshot = await this.prisma.perfReviewSnapshot.create({
      data: {
        tenantId: ctx.tenantId,
        cycleId: data.cycleId,
        employeeId: data.employeeId,
        reviewId: data.reviewId,
        snapshotType: data.snapshotType || 'FINALIZED',
        reviewData,
        scoreTrace: scoreTrace?.traceData || null,
        templateVersionId: review.templateVersionId,
        finalScore: rating?.overallScore || null,
        finalLabel: rating?.ratingLabel || null,
      },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.REVIEW_SNAPSHOT_CREATED, {
      snapshotId: snapshot.id,
      reviewId: data.reviewId,
      cycleId: data.cycleId,
      employeeId: data.employeeId,
      snapshotType: data.snapshotType || 'FINALIZED',
    });

    this.logger.log(`Review snapshot captured: ${snapshot.id} (type: ${snapshot.snapshotType})`);
    return snapshot;
  }
}
