import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';
import { PerformanceTimelineService } from './performance-timeline.service';

/**
 * Goal Service
 * 
 * Manages immutable goals with versioning. Instead of updating goals:
 *   Goal V1 → Goal V2 → Goal V3
 * 
 * Each version is a new row. Progress always references the active version.
 * Previous versions are marked isActive=false but never deleted.
 */
@Injectable()
export class GoalService {
  private readonly logger = new Logger(GoalService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly timeline: PerformanceTimelineService,
  ) {}

  /**
   * Create a new goal (V1).
   */
  async createGoal(ctx: any, data: {
    title: string;
    description?: string;
    category?: string;
    parentGoalId?: string;
  }): Promise<any> {
    const goal = await this.prisma.perfGoal.create({
      data: {
        tenantId: ctx.tenantId,
        title: data.title,
        description: data.description,
        category: data.category,
        parentGoalId: data.parentGoalId,
        versionNumber: 1,
        isActive: true,
      },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.GOAL_VERSION_CREATED, {
      goalId: goal.id,
      versionNumber: 1,
      title: data.title,
    });

    this.logger.log(`Goal created: ${goal.id} (V1)`);
    return goal;
  }

  /**
   * Create a new version of an existing goal.
   * The current active version is marked inactive; a new row is created.
   * This preserves the immutable history.
   */
  async createNewVersion(ctx: any, currentGoalId: string, updates: {
    title?: string;
    description?: string;
    category?: string;
  }): Promise<any> {
    const current = await this.prisma.perfGoal.findFirst({
      where: { id: currentGoalId, tenantId: ctx.tenantId, isActive: true },
    });

    if (!current) {
      throw new BadRequestException('Active goal not found');
    }

    // Mark current version as inactive
    await this.prisma.perfGoal.update({
      where: { id: currentGoalId },
      data: { isActive: false },
    });

    // Create new version
    const newGoal = await this.prisma.perfGoal.create({
      data: {
        tenantId: ctx.tenantId,
        title: updates.title || current.title,
        description: updates.description || current.description,
        category: updates.category || current.category,
        parentGoalId: current.parentGoalId,
        versionNumber: current.versionNumber + 1,
        isActive: true,
      },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.GOAL_VERSION_CREATED, {
      goalId: newGoal.id,
      previousGoalId: currentGoalId,
      versionNumber: newGoal.versionNumber,
    });

    this.logger.log(`Goal versioned: ${currentGoalId} (V${current.versionNumber}) → ${newGoal.id} (V${newGoal.versionNumber})`);
    return newGoal;
  }

  /**
   * Assign a goal to an employee in a cycle.
   */
  async assignGoal(ctx: any, data: {
    cycleId: string;
    employeeId: string;
    goalId: string;
    weight?: number;
    targetValue?: number;
  }): Promise<any> {
    const assignment = await this.prisma.perfGoalAssignment.create({
      data: {
        tenantId: ctx.tenantId,
        cycleId: data.cycleId,
        employeeId: data.employeeId,
        goalId: data.goalId,
        weight: data.weight || 0,
        targetValue: data.targetValue,
        status: 'Assigned',
      },
    });

    return assignment;
  }

  /**
   * Record progress against a goal assignment.
   * Always references the goalVersionNumber that was active when recorded.
   */
  async recordProgress(ctx: any, assignmentId: string, progressValue: number, note?: string): Promise<any> {
    const assignment = await this.prisma.perfGoalAssignment.findFirst({
      where: { id: assignmentId, tenantId: ctx.tenantId },
      include: { goal: true },
    });

    if (!assignment) {
      throw new BadRequestException('Goal assignment not found');
    }

    const progress = await this.prisma.perfGoalProgress.create({
      data: {
        tenantId: ctx.tenantId,
        assignmentId,
        goalVersionNumber: assignment.goal.versionNumber,
        progressValue,
        note,
      },
    });

    // Check if goal is completed
    if (assignment.targetValue && progressValue >= assignment.targetValue) {
      await this.prisma.perfGoalAssignment.update({
        where: { id: assignmentId },
        data: { status: 'Completed' },
      });

      await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.GOAL_COMPLETED, {
        assignmentId,
        goalId: assignment.goalId,
        progressValue,
        targetValue: assignment.targetValue,
      });
    }

    return progress;
  }
}
