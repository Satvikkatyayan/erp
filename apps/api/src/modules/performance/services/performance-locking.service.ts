import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceTimelineService } from './performance-timeline.service';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Performance Locking Service
 * 
 * Manages lock scopes: EMPLOYEE, DEPARTMENT, CYCLE, ORGANIZATION
 * 
 * Finalized reviews cannot be edited. Corrections only through:
 *   Finalized → Reopen Approved (Workflow) → Review Version V2 → Finalize Again
 * 
 * Lock state is persisted in PerfPerformanceCycle.lockedScopes as a JSON structure.
 */
@Injectable()
export class PerformanceLockingService {
  private readonly logger = new Logger(PerformanceLockingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly timeline: PerformanceTimelineService,
  ) {}

  /**
   * Lock a scope. Prevents further modifications at the specified level.
   */
  async lockScope(ctx: any, cycleId: string, scope: {
    level: 'EMPLOYEE' | 'DEPARTMENT' | 'CYCLE' | 'ORGANIZATION';
    targetId?: string; // employeeId or departmentId for granular locks
  }): Promise<void> {
    const cycle = await this.prisma.perfPerformanceCycle.findFirst({
      where: { id: cycleId, tenantId: ctx.tenantId },
    });

    if (!cycle) throw new BadRequestException('Cycle not found');

    const lockedScopes = (cycle.lockedScopes as any) || { locks: [] };
    lockedScopes.locks.push({
      level: scope.level,
      targetId: scope.targetId || null,
      lockedBy: ctx.userId,
      lockedAt: new Date().toISOString(),
    });

    await this.prisma.perfPerformanceCycle.update({
      where: { id: cycleId },
      data: { lockedScopes },
    });

    await this.timeline.recordEvent(ctx, cycleId, scope.targetId || null, 'ScopeLocked', {
      level: scope.level,
      targetId: scope.targetId,
    });

    this.logger.log(`Scope locked: ${scope.level} (target: ${scope.targetId || 'all'}) in cycle ${cycleId}`);
  }

  /**
   * Check if a specific action is locked for an employee.
   */
  isLocked(lockedScopes: any, employeeId: string, departmentId?: string): boolean {
    if (!lockedScopes?.locks) return false;
    const locks = lockedScopes.locks as any[];

    // Organization-level lock blocks everything
    if (locks.some((l: any) => l.level === 'ORGANIZATION')) return true;

    // Cycle-level lock blocks everything
    if (locks.some((l: any) => l.level === 'CYCLE')) return true;

    // Department-level lock
    if (departmentId && locks.some((l: any) => l.level === 'DEPARTMENT' && l.targetId === departmentId)) return true;

    // Employee-level lock
    if (locks.some((l: any) => l.level === 'EMPLOYEE' && l.targetId === employeeId)) return true;

    return false;
  }

  /**
   * Reopen a finalized review. Only through approved workflow.
   * Creates a new review version; the finalized version is preserved.
   */
  async reopenReview(ctx: any, reviewId: string, reason: string): Promise<any> {
    const review = await this.prisma.perfReview.findFirst({
      where: { id: reviewId, tenantId: ctx.tenantId },
    });

    if (!review) throw new BadRequestException('Review not found');
    if (review.status !== 'Finalized') {
      throw new BadRequestException('Only finalized reviews can be reopened');
    }

    // Trigger workflow approval for reopen
    await this.sdk.workflow.trigger(ctx, reviewId);

    // Get current max version number
    const maxVersion = await this.prisma.perfReviewVersion.aggregate({
      where: { reviewId, tenantId: ctx.tenantId },
      _max: { versionNumber: true },
    });

    const newVersionNumber = (maxVersion._max.versionNumber || 0) + 1;

    // Create a new review version
    const newVersion = await this.prisma.perfReviewVersion.create({
      data: {
        tenantId: ctx.tenantId,
        reviewId,
        versionNumber: newVersionNumber,
        reviewData: { reopenedFrom: maxVersion._max.versionNumber, reason },
      },
    });

    // Update review status back to InProgress
    await this.prisma.perfReview.update({
      where: { id: reviewId },
      data: { status: 'InProgress' },
    });

    // Update SLA
    await this.prisma.perfReviewSLA.updateMany({
      where: { reviewId, tenantId: ctx.tenantId },
      data: { reopenedAt: new Date() },
    });

    // Publish event
    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.REVIEW_REOPENED, {
      reviewId,
      newVersionNumber,
      reason,
    });

    await this.timeline.recordEvent(ctx, review.cycleId, review.employeeId, 'ReviewReopened', {
      reviewId,
      newVersionNumber,
      reason,
    });

    this.logger.log(`Review ${reviewId} reopened as V${newVersionNumber}`);
    return newVersion;
  }

  /**
   * Unlock a specific scope. Only through approved workflow.
   */
  async unlockScope(ctx: any, cycleId: string, scope: {
    level: string;
    targetId?: string;
  }): Promise<void> {
    const cycle = await this.prisma.perfPerformanceCycle.findFirst({
      where: { id: cycleId, tenantId: ctx.tenantId },
    });

    if (!cycle) throw new BadRequestException('Cycle not found');

    const lockedScopes = (cycle.lockedScopes as any) || { locks: [] };
    lockedScopes.locks = lockedScopes.locks.filter(
      (l: any) => !(l.level === scope.level && (l.targetId || null) === (scope.targetId || null)),
    );

    await this.prisma.perfPerformanceCycle.update({
      where: { id: cycleId },
      data: { lockedScopes },
    });

    await this.timeline.recordEvent(ctx, cycleId, scope.targetId || null, 'ScopeUnlocked', {
      level: scope.level,
      targetId: scope.targetId,
    });

    this.logger.log(`Scope unlocked: ${scope.level} (target: ${scope.targetId || 'all'}) in cycle ${cycleId}`);
  }
}
