import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { AttendanceReviewStatus } from '@prisma/client';
import { AttendanceReviewEvent } from '../events/attendance-review.events';

export const REVIEW_ROLES_ORDER = ['HR', 'COORDINATOR', 'VC', 'OWNER'];

@Injectable()
export class AttendanceReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService
  ) {}

  async startReviewProcess(musterId: string, correlationId: string, prismaTx?: any) {
    const db = prismaTx || this.prisma;
    
    // Create initial pending reviews
    const reviews = REVIEW_ROLES_ORDER.map(role => ({
      musterId,
      reviewerId: '00000000-0000-0000-0000-000000000000', // Assignee will claim it later
      role,
      status: AttendanceReviewStatus.PENDING
    }));

    await db.attendanceReview.createMany({ data: reviews });

    this.eventBus.publish(new AttendanceReviewEvent(
      'AttendanceReviewStarted',
      correlationId,
      { musterId }
    ));
  }

  async recordDecision(
    musterId: string, 
    reviewerId: string, 
    reviewerRole: string, 
    decision: AttendanceReviewStatus, 
    remarks: string,
    correlationId: string,
    prismaTx?: any
  ) {
    const db = prismaTx || this.prisma;

    // 1. Get all reviews for this muster
    const reviews = await db.attendanceReview.findMany({
      where: { musterId },
      orderBy: { createdAt: 'asc' }
    });

    if (reviews.length === 0) {
      throw new BadRequestException('Review process not started for this muster.');
    }

    const currentReviewIndex = REVIEW_ROLES_ORDER.indexOf(reviewerRole);
    if (currentReviewIndex === -1) throw new BadRequestException('Invalid reviewer role.');

    // 2. Workflow Validation: Enforce Sequential Review
    for (let i = 0; i < currentReviewIndex; i++) {
      const prerequisiteRole = REVIEW_ROLES_ORDER[i];
      const prerequisiteReview = reviews.find(r => r.role === prerequisiteRole);
      
      if (!prerequisiteReview || prerequisiteReview.status !== AttendanceReviewStatus.APPROVED) {
        throw new BadRequestException(`Cannot review. Pending approval from ${prerequisiteRole}.`);
      }
    }

    const reviewToUpdate = reviews.find(r => r.role === reviewerRole);
    if (!reviewToUpdate) {
      throw new BadRequestException(`Review assignment not found for role ${reviewerRole}.`);
    }

    if (reviewToUpdate.status === AttendanceReviewStatus.APPROVED || reviewToUpdate.status === AttendanceReviewStatus.REJECTED) {
      throw new BadRequestException('Review decision already recorded.');
    }

    // 3. Update Review
    await db.attendanceReview.update({
      where: { id: reviewToUpdate.id },
      data: {
        reviewerId,
        status: decision,
        remarks,
        reviewedAt: new Date()
      }
    });

    // 4. Publish appropriate event
    const eventName = decision === AttendanceReviewStatus.APPROVED ? 'AttendanceReviewCompleted' : 
                      decision === AttendanceReviewStatus.REJECTED ? 'AttendanceReviewRejected' : 
                      decision === AttendanceReviewStatus.RETURNED ? 'AttendanceReviewReturned' : null;

    if (eventName) {
      this.eventBus.publish(new AttendanceReviewEvent(
        eventName,
        correlationId,
        { musterId, reviewerId, role: reviewerRole, decision, remarks }
      ));
    }

    // 5. Check if Final Review is Eligible
    if (decision === AttendanceReviewStatus.APPROVED && reviewerRole === REVIEW_ROLES_ORDER[REVIEW_ROLES_ORDER.length - 2]) { // VC
       this.eventBus.publish(new AttendanceReviewEvent(
         'AttendanceFinalReviewEligible',
         correlationId,
         { musterId }
       ));
    }
  }

  async isEligibleForFinalLock(musterId: string, prismaTx?: any): Promise<boolean> {
    const db = prismaTx || this.prisma;
    const reviews = await db.attendanceReview.findMany({ where: { musterId } });
    
    // Check if everyone EXCEPT owner has approved
    const mandatoryRoles = REVIEW_ROLES_ORDER.slice(0, -1);
    for (const role of mandatoryRoles) {
      const r = reviews.find(rv => rv.role === role);
      if (!r || r.status !== AttendanceReviewStatus.APPROVED) return false;
    }
    
    return true;
  }
}
