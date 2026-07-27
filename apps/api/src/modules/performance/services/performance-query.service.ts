import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class PerformanceQueryService {
  private readonly logger = new Logger(PerformanceQueryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getActiveGoals(ctx: PlatformContext) {
    return this.prisma.perfGoalAssignment.findMany({
      where: { employeeId: ctx.userId, status: 'InProgress' },
      include: { goal: true }
    });
  }

  async getPendingReviews(ctx: PlatformContext) {
    return this.prisma.perfReview.findMany({
      where: { employeeId: ctx.userId, status: 'InProgress' }
    });
  }
}
