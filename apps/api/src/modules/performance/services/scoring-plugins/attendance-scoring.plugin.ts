import { Injectable } from '@nestjs/common';
import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';

/**
 * Attendance Scoring Plugin
 * 
 * Optional plugin — only active when PERF_INCLUDE_ATTENDANCE feature flag is enabled.
 * Uses attendance metrics from the snapshot (never reads Attendance module directly).
 */
@Injectable()
export class AttendanceScoringPlugin implements ScoringPlugin {
  readonly name = 'AttendanceScore';
  readonly order = 40;

  isApplicable(ctx: ScoringContext): boolean {
    return ctx.featureFlags['PERF_INCLUDE_ATTENDANCE'] === true
      && ctx.snapshotData?.attendanceIncluded === true;
  }

  async evaluate(ctx: ScoringContext): Promise<ScoringResult> {
    const metrics = ctx.snapshotData?.attendanceMetrics;

    if (!metrics) {
      return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No attendance data in snapshot' } };
    }

    // Score based on attendance percentage
    // presentDays / totalWorkingDays * 100
    const totalDays = metrics.totalWorkingDays || 1;
    const presentDays = metrics.presentDays || 0;
    const rawScore = Math.min((presentDays / totalDays) * 100, 100);
    const configWeight = ctx.cycleConfig?.attendanceWeight ?? 0.05;

    return {
      component: this.name,
      rawScore,
      weight: configWeight,
      weightedScore: rawScore * configWeight,
      metadata: {
        presentDays,
        totalDays,
        absentDays: metrics.absentDays || 0,
        lateDays: metrics.lateDays || 0,
      },
    };
  }
}
