import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Development Recommendation Service
 * 
 * Event-driven approach: generates recommendations from skill gap analysis
 * but never creates Learning records directly.
 * 
 * Flow:
 *   Skill Gap → Recommendation Engine → Development Plan → Learning Module (future)
 * 
 * Publishes DevelopmentRecommendationGenerated events for future
 * Learning module subscription.
 */
@Injectable()
export class DevelopmentRecommendationService {
  private readonly logger = new Logger(DevelopmentRecommendationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
  ) {}

  /**
   * Generate development recommendations from competency gap analysis.
   * Analyzes targetLevel vs currentLevel for each competency assignment.
   */
  async generateRecommendations(ctx: any, cycleId: string, employeeId: string): Promise<any[]> {
    this.logger.log(`Generating development recommendations for employee ${employeeId}`);

    // Get competency assignments with gap data
    const assignments = await this.prisma.perfCompetencyAssignment.findMany({
      where: { employeeId, tenantId: ctx.tenantId },
      include: { competency: true },
    });

    const recommendations: any[] = [];

    for (const assignment of assignments) {
      const targetLevel = assignment.targetLevel || 5;
      const currentLevel = assignment.currentLevel || 0;
      const gap = targetLevel - currentLevel;

      if (gap <= 0) continue; // No gap — no recommendation needed

      const priority = this.assessPriority(gap);
      const recommendationType = this.suggestActionType(gap, assignment.competency.name);

      const rec = await this.prisma.perfDevelopmentRecommendation.create({
        data: {
          tenantId: ctx.tenantId,
          cycleId,
          employeeId,
          competencyId: assignment.competencyId,
          skillGap: gap,
          recommendationType,
          priority,
          description: `Develop ${assignment.competency.name}: current level ${currentLevel}, target level ${targetLevel}. Recommended: ${recommendationType}.`,
          status: 'GENERATED',
        },
      });

      recommendations.push(rec);
    }

    // Publish event for each recommendation (future Learning module subscribes)
    if (recommendations.length > 0) {
      await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.DEVELOPMENT_RECOMMENDATION_GENERATED, {
        cycleId,
        employeeId,
        recommendationCount: recommendations.length,
        recommendations: recommendations.map(r => ({
          id: r.id,
          competencyId: r.competencyId,
          type: r.recommendationType,
          priority: r.priority,
          skillGap: r.skillGap,
        })),
      });
    }

    this.logger.log(`Generated ${recommendations.length} development recommendations`);
    return recommendations;
  }

  /**
   * Assess priority based on skill gap magnitude.
   */
  private assessPriority(gap: number): string {
    if (gap >= 3) return 'CRITICAL';
    if (gap >= 2) return 'HIGH';
    if (gap >= 1) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Suggest an action type based on gap size and competency type.
   */
  private suggestActionType(gap: number, competencyName: string): string {
    if (gap >= 3) return 'Training';
    if (gap >= 2) return 'Mentoring';
    if (competencyName.toLowerCase().includes('leadership')) return 'Coaching';
    if (competencyName.toLowerCase().includes('technical')) return 'Certification';
    return 'StretchAssignment';
  }
}
