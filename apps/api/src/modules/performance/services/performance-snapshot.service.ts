import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Performance Snapshot Service
 * 
 * Mirrors PayrollRunService.captureSnapshot() — captures the exact state
 * used during evaluation to guarantee historical reviews remain reproducible.
 * 
 * Snapshot = INPUTS (employee, hierarchy, goals, KPIs, competencies, config)
 * Separate from ReviewSnapshot = OUTPUTS (scores, ratings, calibration)
 * 
 * Feature flags:
 *  - PERF_INCLUDE_ATTENDANCE: Include attendance metrics
 *  - PERF_INCLUDE_LEAVE: Include leave metrics
 */
@Injectable()
export class PerformanceSnapshotService {
  private readonly logger = new Logger(PerformanceSnapshotService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
  ) {}

  /**
   * Capture performance snapshot for an employee in a cycle.
   * Idempotent: if snapshot exists, reuse it for deterministic re-evaluation.
   */
  async captureSnapshot(ctx: any, cycleId: string, employeeId: string): Promise<any> {
    // Idempotency check — reuse existing snapshot
    const existing = await this.prisma.perfPerformanceSnapshot.findFirst({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
    });

    if (existing) {
      this.logger.warn(`Using existing snapshot for deterministic evaluation (Employee ${employeeId})`);
      return existing;
    }

    // --- Gather all snapshot data ---

    // Employee information
    const employee = await this.prisma.empEmployee.findFirst({
      where: { id: employeeId, tenantId: ctx.tenantId },
    });

    // Reporting hierarchy (manager)
    const managerData = employee ? await this.getManagerData(ctx.tenantId, employee) : null;

    // Position and department
    const positionData = employee ? await this.getPositionData(ctx.tenantId, employee) : null;

    // Goal assignments and versions
    const goalAssignments = await this.prisma.perfGoalAssignment.findMany({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
      include: { goal: true },
    });

    // Goal progress
    const goalProgress = await this.prisma.perfGoalProgress.findMany({
      where: {
        tenantId: ctx.tenantId,
        assignment: { cycleId, employeeId },
      },
    });

    // Competency assignments
    const competencyAssignments = await this.prisma.perfCompetencyAssignment.findMany({
      where: { employeeId, tenantId: ctx.tenantId },
    });

    // Competency ratings for this cycle's review
    const review = await this.prisma.perfReview.findFirst({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
    });
    const competencyRatings = review
      ? await this.prisma.perfCompetencyRating.findMany({
          where: { reviewId: review.id, tenantId: ctx.tenantId },
        })
      : [];

    // KPI results
    const kpiAssignments = await this.prisma.perfKPIAssignment.findMany({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
      include: { results: true, kpi: true },
    });
    const kpiResults = kpiAssignments.flatMap((a: any) =>
      a.results.map((r: any) => ({
        ...r,
        kpiName: a.kpi.name,
        kpiCode: a.kpi.code,
        targetValue: a.targetValue,
      })),
    );

    // Rating scale version
    const cycleConfig = await this.prisma.perfCycleConfiguration.findFirst({
      where: { organizationId: ctx.organizationId, tenantId: ctx.tenantId },
    });
    const ratingScaleVersion = cycleConfig?.ratingScaleId || null;

    // Review template version
    const reviewTemplateVersion = review?.templateVersionId || null;

    // Rules engine version (mock — would come from PlatformRuleSDK in production)
    const rulesEngineVersion = '1.0.0';

    // Feature-flagged optional metrics
    const featureFlags = ctx.featureFlags || {};
    const attendanceIncluded = featureFlags['PERF_INCLUDE_ATTENDANCE'] === true;
    const leaveIncluded = featureFlags['PERF_INCLUDE_LEAVE'] === true;

    // Mock attendance and leave data (read from respective modules via SDK in production)
    const attendanceMetrics = attendanceIncluded
      ? { totalWorkingDays: 22, presentDays: 20, absentDays: 2, lateDays: 1 }
      : null;
    const leaveMetrics = leaveIncluded
      ? { totalLeaveDays: 5, plannedLeaveDays: 4, unplannedLeaveDays: 1, maxUnplannedThreshold: 5 }
      : null;

    // --- Build consolidated snapshot ---
    const snapshotData = {
      // Employee
      employeeData: employee ? { id: employee.id, employeeNumber: (employee as any).employeeNumber, status: employee.status } : null,
      managerData,
      positionData,

      // Goals
      goalAssignments: goalAssignments.map((a: any) => ({
        id: a.id,
        goalId: a.goalId,
        goalTitle: a.goal.title,
        goalVersionNumber: a.goal.versionNumber,
        weight: a.weight,
        targetValue: a.targetValue,
        status: a.status,
      })),
      goalProgress: goalProgress.map((p: any) => ({
        assignmentId: p.assignmentId,
        goalVersionNumber: p.goalVersionNumber,
        progressValue: p.progressValue,
        recordedAt: p.recordedAt,
      })),

      // Competencies
      competencyAssignments: competencyAssignments.map((a: any) => ({
        id: a.id,
        competencyId: a.competencyId,
        targetLevel: a.targetLevel,
        currentLevel: a.currentLevel,
      })),
      competencyRatings: competencyRatings.map((r: any) => ({
        competencyId: r.competencyId,
        ratedById: r.ratedById,
        rating: r.rating,
      })),

      // KPIs
      kpiResults,

      // Configuration versions
      ratingScaleVersion,
      reviewTemplateVersion,
      rulesEngineVersion,

      // Feature flag inclusion tracking
      attendanceIncluded,
      leaveIncluded,
      attendanceMetrics,
      leaveMetrics,
    };

    // --- Persist snapshot ---
    const snapshot = await this.prisma.perfPerformanceSnapshot.create({
      data: {
        tenantId: ctx.tenantId,
        cycleId,
        employeeId,
        snapshotData,
      },
    });

    // Publish event
    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.SNAPSHOT_CREATED, {
      snapshotId: snapshot.id,
      cycleId,
      employeeId,
      attendanceIncluded,
      leaveIncluded,
    });

    this.logger.log(`Performance snapshot captured for employee ${employeeId} in cycle ${cycleId}`);
    return snapshot;
  }

  private async getManagerData(tenantId: string, employee: any): Promise<any> {
    // In production, this would traverse the reporting hierarchy
    // For now, return a structured placeholder
    return {
      managerId: null,
      managerName: null,
    };
  }

  private async getPositionData(tenantId: string, employee: any): Promise<any> {
    // In production, this would fetch position and department from Employee module via SDK
    return {
      positionId: null,
      positionTitle: null,
      departmentId: null,
      departmentName: null,
    };
  }
}
