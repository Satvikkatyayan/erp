import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Nine-Box Service
 * 
 * Calculates nine-box succession matrix placements using:
 *   Performance Score × Leadership Potential → Nine-Box Matrix
 * 
 * Matrix Layout (3x3):
 *   High Potential:    [Potential Gem]  [High Potential]   [Star]
 *   Medium Potential:  [Dilemma]        [Core Player]      [High Performer]
 *   Low Potential:     [Under Performer][Effective]         [Inconsistent Player]
 *                      Low Performance  Medium Performance  High Performance
 */
@Injectable()
export class NineBoxService {
  private readonly logger = new Logger(NineBoxService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
  ) {}

  /**
   * Record a potential assessment for an employee.
   */
  async assessPotential(ctx: any, data: {
    employeeId: string;
    cycleId: string;
    potentialScore: number;
  }): Promise<any> {
    const assessment = await this.prisma.perfPotentialAssessment.create({
      data: {
        tenantId: ctx.tenantId,
        employeeId: data.employeeId,
        cycleId: data.cycleId,
        potentialScore: data.potentialScore,
        assessedBy: ctx.userId,
      },
    });

    this.logger.log(`Potential assessed: employee=${data.employeeId}, score=${data.potentialScore}`);
    return assessment;
  }

  /**
   * Calculate nine-box placement using performance score and potential score.
   */
  async calculatePlacement(ctx: any, cycleId: string, employeeId: string): Promise<any> {
    // Get performance rating
    const rating = await this.prisma.perfRating.findFirst({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
    });

    // Get potential assessment
    const potential = await this.prisma.perfPotentialAssessment.findFirst({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
      orderBy: { assessedAt: 'desc' },
    });

    if (!rating || !potential) {
      throw new Error('Both performance rating and potential assessment are required for nine-box placement');
    }

    const performanceScore = rating.overallScore;
    const potentialScore = potential.potentialScore;
    const boxLabel = this.computeBoxLabel(performanceScore, potentialScore);

    // Idempotency: remove existing placement
    await this.prisma.perfNineBoxPlacement.deleteMany({
      where: { cycleId, employeeId, tenantId: ctx.tenantId },
    });

    const placement = await this.prisma.perfNineBoxPlacement.create({
      data: {
        tenantId: ctx.tenantId,
        employeeId,
        cycleId,
        performanceScore,
        potentialScore,
        boxLabel,
      },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.NINE_BOX_PLACEMENT_CALCULATED, {
      placementId: placement.id,
      employeeId,
      cycleId,
      performanceScore,
      potentialScore,
      boxLabel,
    });

    this.logger.log(`Nine-box placement: employee=${employeeId}, box=${boxLabel}`);
    return placement;
  }

  /**
   * Get the full nine-box matrix for a cycle.
   */
  async getMatrix(tenantId: string, cycleId: string): Promise<any[]> {
    return this.prisma.perfNineBoxPlacement.findMany({
      where: { tenantId, cycleId },
    });
  }

  /**
   * Compute the nine-box label based on performance and potential scores.
   * Both scores are on a 0-100 scale.
   */
  private computeBoxLabel(performance: number, potential: number): string {
    const perfLevel = performance >= 80 ? 'high' : performance >= 60 ? 'medium' : 'low';
    const potLevel = potential >= 80 ? 'high' : potential >= 60 ? 'medium' : 'low';

    const matrix: Record<string, Record<string, string>> = {
      high: {
        high: 'Star',
        medium: 'High Performer',
        low: 'Inconsistent Player',
      },
      medium: {
        high: 'High Potential',
        medium: 'Core Player',
        low: 'Effective',
      },
      low: {
        high: 'Potential Gem',
        medium: 'Dilemma',
        low: 'Under Performer',
      },
    };

    return matrix[perfLevel][potLevel];
  }
}
