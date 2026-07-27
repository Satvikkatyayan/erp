import { Injectable, BadRequestException } from '@nestjs/common';
import { MusterWorkflowStatus } from '@prisma/client';

export interface TransitionContext {
  from: MusterWorkflowStatus;
  to: MusterWorkflowStatus;
  actorId: string;
  actorRoles: string[];
}

@Injectable()
export class AttendanceStateMachine {
  private readonly validTransitions: Record<MusterWorkflowStatus, MusterWorkflowStatus[]> = {
    [MusterWorkflowStatus.DRAFT]: [MusterWorkflowStatus.SUBMITTED],
    [MusterWorkflowStatus.SUBMITTED]: [MusterWorkflowStatus.VALIDATED, MusterWorkflowStatus.DRAFT], // Return to draft if rejected validation
    [MusterWorkflowStatus.VALIDATED]: [MusterWorkflowStatus.UNDER_REVIEW],
    [MusterWorkflowStatus.UNDER_REVIEW]: [MusterWorkflowStatus.LOCKED, MusterWorkflowStatus.REVIEWED],
    [MusterWorkflowStatus.REVIEWED]: [MusterWorkflowStatus.LOCKED],
    [MusterWorkflowStatus.LOCKED]: [MusterWorkflowStatus.CORRECTION_REQUESTED],
    [MusterWorkflowStatus.CORRECTION_REQUESTED]: [MusterWorkflowStatus.REOPENED, MusterWorkflowStatus.LOCKED], // Reopen or reject
    [MusterWorkflowStatus.REOPENED]: [MusterWorkflowStatus.LOCKED],
    [MusterWorkflowStatus.ESCALATED]: [MusterWorkflowStatus.UNDER_REVIEW]
  };

  canTransition(from: MusterWorkflowStatus, to: MusterWorkflowStatus): boolean {
    const allowed = this.validTransitions[from];
    return allowed ? allowed.includes(to) : false;
  }

  validateTransition(ctx: TransitionContext): void {
    if (!this.canTransition(ctx.from, ctx.to)) {
      throw new BadRequestException(`Invalid workflow transition from ${ctx.from} to ${ctx.to}.`);
    }

    // Authorization checks based on roles
    if (ctx.to === MusterWorkflowStatus.SUBMITTED && !ctx.actorRoles.includes('SITE_CLERK') && !ctx.actorRoles.includes('SUPER_ADMIN')) {
      throw new BadRequestException(`Only Site Clerk can submit attendance.`);
    }

    if (ctx.to === MusterWorkflowStatus.VALIDATED && !ctx.actorRoles.includes('PROJECT_MANAGER') && !ctx.actorRoles.includes('SUPER_ADMIN')) {
      throw new BadRequestException(`Only Project Manager can validate attendance.`);
    }

    if (ctx.to === MusterWorkflowStatus.UNDER_REVIEW && !ctx.actorRoles.includes('HR_ADMIN') && !ctx.actorRoles.includes('SUPER_ADMIN')) {
      throw new BadRequestException(`Only HR can start the review process.`);
    }

    if (ctx.to === MusterWorkflowStatus.LOCKED && !ctx.actorRoles.includes('OWNER') && !ctx.actorRoles.includes('SUPER_ADMIN')) {
      throw new BadRequestException(`Only Owner can lock attendance.`);
    }
  }

  transition(from: MusterWorkflowStatus, to: MusterWorkflowStatus): MusterWorkflowStatus {
    if (!this.canTransition(from, to)) {
      throw new BadRequestException(`Invalid transition: ${from} -> ${to}`);
    }
    return to;
  }
}
