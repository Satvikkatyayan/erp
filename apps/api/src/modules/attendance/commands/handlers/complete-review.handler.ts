import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { CompleteReviewCommand } from '../complete-review.command';
import { AttendanceReviewService } from '../../services/attendance-review.service';

@Injectable()
export class CompleteReviewHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reviewService: AttendanceReviewService
  ) {}

  async execute(command: CompleteReviewCommand) {
    return this.prisma.$transaction(async (tx) => {
      const reviewerRole = command.actorRoles.find(r => ['HR', 'COORDINATOR', 'VC', 'OWNER'].includes(r));
      if (!reviewerRole) throw new BadRequestException('Actor does not have a valid review role.');

      await this.reviewService.recordDecision(
        command.musterId,
        command.actorId,
        reviewerRole,
        command.decision,
        command.remarks,
        command.correlationId,
        tx
      );

      await tx.musterTimeline.create({
        data: {
          musterId: command.musterId,
          action: 'AttendanceReviewAction',
          actorId: command.actorId,
          timestamp: new Date(),
          reason: command.remarks,
          previousState: 'UNDER_REVIEW',
          currentState: 'UNDER_REVIEW',
          version: 1
        }
      });

      return { success: true };
    });
  }
}
