import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';
import { PerformanceTimelineService } from './performance-timeline.service';

/**
 * Calibration Service
 * 
 * Manages rating calibration with full audit trail.
 * Calibration flows through Workflow SDK:
 *   Manager → HR → Calibration Committee → Executive → Approved
 * 
 * Every adjustment is recorded in PerfCalibrationHistory for auditability.
 */
@Injectable()
export class CalibrationService {
  private readonly logger = new Logger(CalibrationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly timeline: PerformanceTimelineService,
  ) {}

  /**
   * Calibrate a rating. Records the adjustment and creates an audit history entry.
   * Triggers a Workflow SDK approval flow.
   */
  async calibrateRating(ctx: any, data: {
    ratingId: string;
    calibratedScore: number;
    reason?: string;
    stage: string; // Manager, HR, CalibrationCommittee, Executive
  }): Promise<any> {
    const rating = await this.prisma.perfRating.findFirst({
      where: { id: data.ratingId, tenantId: ctx.tenantId },
    });

    if (!rating) {
      throw new Error('Rating not found');
    }

    // Check for existing calibration
    const existing = await this.prisma.perfCalibration.findFirst({
      where: { ratingId: data.ratingId, tenantId: ctx.tenantId },
    });

    const previousScore = existing ? existing.calibratedScore : rating.overallScore;

    let calibration: any;
    if (existing) {
      // Update existing calibration
      calibration = await this.prisma.perfCalibration.update({
        where: { id: existing.id },
        data: {
          originalScore: existing.originalScore, // Preserve original
          calibratedScore: data.calibratedScore,
          calibratedBy: ctx.userId,
          reason: data.reason,
        },
      });
    } else {
      // Create new calibration
      calibration = await this.prisma.perfCalibration.create({
        data: {
          tenantId: ctx.tenantId,
          ratingId: data.ratingId,
          originalScore: rating.overallScore,
          calibratedScore: data.calibratedScore,
          calibratedBy: ctx.userId,
          reason: data.reason,
        },
      });
    }

    // Record calibration history (audit trail)
    await this.prisma.perfCalibrationHistory.create({
      data: {
        tenantId: ctx.tenantId,
        calibrationId: calibration.id,
        ratingId: data.ratingId,
        previousScore,
        newScore: data.calibratedScore,
        adjustedBy: ctx.userId,
        reason: data.reason,
        stage: data.stage,
      },
    });

    // Trigger Workflow SDK for calibration approval
    await this.sdk.workflow.trigger(ctx, calibration.id);

    // Record timeline event
    await this.timeline.recordEvent(ctx, rating.cycleId, rating.employeeId, 'CalibrationAdjusted', {
      calibrationId: calibration.id,
      stage: data.stage,
      previousScore,
      newScore: data.calibratedScore,
    });

    this.logger.log(`Calibration: ${previousScore} → ${data.calibratedScore} (stage: ${data.stage})`);
    return calibration;
  }

  /**
   * Complete the calibration process. Called when workflow is approved.
   * Publishes CalibrationCompleted event.
   */
  async completeCalibration(ctx: any, calibrationId: string): Promise<void> {
    const calibration = await this.prisma.perfCalibration.findFirst({
      where: { id: calibrationId, tenantId: ctx.tenantId },
      include: { rating: true },
    });

    if (!calibration) return;

    // Update the rating's overall score to the calibrated score
    await this.prisma.perfRating.update({
      where: { id: calibration.ratingId },
      data: { overallScore: calibration.calibratedScore },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.CALIBRATION_COMPLETED, {
      calibrationId,
      ratingId: calibration.ratingId,
      employeeId: calibration.rating.employeeId,
      originalScore: calibration.originalScore,
      calibratedScore: calibration.calibratedScore,
    });

    await this.timeline.recordEvent(
      ctx,
      calibration.rating.cycleId,
      calibration.rating.employeeId,
      'CalibrationCompleted',
      { calibrationId },
    );

    this.logger.log(`Calibration completed: ${calibrationId}`);
  }

  /**
   * Get calibration history for a rating.
   */
  async getCalibrationHistory(tenantId: string, ratingId: string): Promise<any[]> {
    return this.prisma.perfCalibrationHistory.findMany({
      where: { tenantId, ratingId },
      orderBy: { adjustedAt: 'asc' },
    });
  }
}
