import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * KPI Service
 * 
 * Manages KPI definitions, assignments, and result tracking.
 * KPIs are separate from goals — they represent measurable business metrics
 * that feed into scoring while goals remain strategic objectives.
 */
@Injectable()
export class KpiService {
  private readonly logger = new Logger(KpiService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
  ) {}

  /**
   * Create a KPI definition.
   */
  async createKPI(ctx: any, data: {
    name: string;
    code: string;
    unit: string;
    targetValue?: number;
  }): Promise<any> {
    const kpi = await this.prisma.perfKPI.create({
      data: {
        tenantId: ctx.tenantId,
        name: data.name,
        code: data.code,
        unit: data.unit,
        targetValue: data.targetValue,
      },
    });

    this.logger.log(`KPI created: ${kpi.code} (${kpi.name})`);
    return kpi;
  }

  /**
   * Assign a KPI to an employee for a cycle.
   */
  async assignKPI(ctx: any, data: {
    kpiId: string;
    employeeId: string;
    cycleId: string;
    targetValue: number;
  }): Promise<any> {
    const assignment = await this.prisma.perfKPIAssignment.create({
      data: {
        tenantId: ctx.tenantId,
        kpiId: data.kpiId,
        employeeId: data.employeeId,
        cycleId: data.cycleId,
        targetValue: data.targetValue,
      },
    });

    return assignment;
  }

  /**
   * Record a KPI result. Calculates achievement percentage automatically.
   * Publishes KPICompleted event.
   */
  async recordResult(ctx: any, assignmentId: string, actualValue: number): Promise<any> {
    const assignment = await this.prisma.perfKPIAssignment.findFirst({
      where: { id: assignmentId, tenantId: ctx.tenantId },
    });

    if (!assignment) {
      throw new Error('KPI assignment not found');
    }

    const achievementPct = assignment.targetValue > 0
      ? (actualValue / assignment.targetValue) * 100
      : 0;

    const result = await this.prisma.perfKPIResult.create({
      data: {
        tenantId: ctx.tenantId,
        assignmentId,
        actualValue,
        achievementPct,
      },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.KPI_COMPLETED, {
      resultId: result.id,
      assignmentId,
      actualValue,
      targetValue: assignment.targetValue,
      achievementPct,
    });

    this.logger.log(`KPI result recorded: assignment=${assignmentId}, achievement=${achievementPct.toFixed(1)}%`);
    return result;
  }
}
