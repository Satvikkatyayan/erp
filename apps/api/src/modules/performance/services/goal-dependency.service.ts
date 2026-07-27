import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Goal Dependency Service
 * 
 * Manages the goal alignment hierarchy:
 *   Corporate Goal → Department Goal → Team Goal → Employee Goal
 * 
 * Supports dependency types: BlockedBy, RelatedTo, ContributesTo
 * Validates against cycles before creating dependencies.
 */
@Injectable()
export class GoalDependencyService {
  private readonly logger = new Logger(GoalDependencyService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
  ) {}

  /**
   * Add a dependency between two goals.
   * Validates no circular dependencies exist.
   */
  async addDependency(ctx: any, data: {
    goalId: string;
    dependsOnGoalId: string;
    dependencyType?: string;
  }): Promise<any> {
    // Prevent self-referencing
    if (data.goalId === data.dependsOnGoalId) {
      throw new BadRequestException('A goal cannot depend on itself');
    }

    // Check for circular dependencies
    const hasCycle = await this.detectCycle(ctx.tenantId, data.dependsOnGoalId, data.goalId);
    if (hasCycle) {
      throw new BadRequestException('Circular dependency detected');
    }

    const dependency = await this.prisma.perfGoalDependency.create({
      data: {
        tenantId: ctx.tenantId,
        goalId: data.goalId,
        dependsOnGoalId: data.dependsOnGoalId,
        dependencyType: data.dependencyType || 'ContributesTo',
      },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.GOAL_DEPENDENCY_CREATED, {
      dependencyId: dependency.id,
      goalId: data.goalId,
      dependsOnGoalId: data.dependsOnGoalId,
      dependencyType: dependency.dependencyType,
    });

    this.logger.log(`Goal dependency created: ${data.goalId} → ${data.dependsOnGoalId} (${dependency.dependencyType})`);
    return dependency;
  }

  /**
   * Get the dependency tree for a goal (downstream children).
   * Returns the full alignment chain.
   */
  async getDependencyTree(tenantId: string, goalId: string, depth: number = 10): Promise<any[]> {
    if (depth <= 0) return [];

    const children = await this.prisma.perfGoalDependency.findMany({
      where: { tenantId, dependsOnGoalId: goalId },
    });

    const tree: any[] = [];
    for (const child of children) {
      const subtree = await this.getDependencyTree(tenantId, child.goalId, depth - 1);
      tree.push({
        dependencyId: child.id,
        goalId: child.goalId,
        dependencyType: child.dependencyType,
        children: subtree,
      });
    }

    return tree;
  }

  /**
   * Get upstream dependencies (what this goal depends on).
   */
  async getUpstreamDependencies(tenantId: string, goalId: string): Promise<any[]> {
    return this.prisma.perfGoalDependency.findMany({
      where: { tenantId, goalId },
    });
  }

  /**
   * Detect circular dependencies using DFS.
   */
  private async detectCycle(tenantId: string, startGoalId: string, targetGoalId: string, visited: Set<string> = new Set()): Promise<boolean> {
    if (startGoalId === targetGoalId) return true;
    if (visited.has(startGoalId)) return false;

    visited.add(startGoalId);

    const deps = await this.prisma.perfGoalDependency.findMany({
      where: { tenantId, goalId: startGoalId },
    });

    for (const dep of deps) {
      if (await this.detectCycle(tenantId, dep.dependsOnGoalId, targetGoalId, visited)) {
        return true;
      }
    }

    return false;
  }
}
