import { Injectable, BadRequestException } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { SubmitAttendanceHandler } from '../commands/handlers/submit-attendance.handler';
import { ValidateAttendanceHandler } from '../commands/handlers/validate-attendance.handler';
import { StartReviewHandler } from '../commands/handlers/start-review.handler';
import { LockAttendanceHandler } from '../commands/handlers/lock-attendance.handler';
import { RequestCorrectionHandler } from '../commands/handlers/request-correction.handler';
import { ApproveCorrectionHandler } from '../commands/handlers/approve-correction.handler';
import { RejectCorrectionHandler } from '../commands/handlers/reject-correction.handler';
import { ReopenAttendanceHandler } from '../commands/handlers/reopen-attendance.handler';

import { SubmitAttendanceCommand } from '../commands/submit-attendance.command';
import { ValidateAttendanceCommand } from '../commands/validate-attendance.command';
import { StartReviewCommand } from '../commands/start-review.command';
import { LockAttendanceCommand } from '../commands/lock-attendance.command';
import { RequestCorrectionCommand } from '../commands/request-correction.command';
import { ApproveCorrectionCommand } from '../commands/approve-correction.command';
import { RejectCorrectionCommand } from '../commands/reject-correction.command';
import { ReopenAttendanceCommand } from '../commands/reopen-attendance.command';

@Injectable()
export class AttendanceLifecycleService {
  constructor(
    private readonly submitHandler: SubmitAttendanceHandler,
    private readonly validateHandler: ValidateAttendanceHandler,
    private readonly startReviewHandler: StartReviewHandler,
    private readonly lockHandler: LockAttendanceHandler,
    private readonly reqCorrectionHandler: RequestCorrectionHandler,
    private readonly appCorrectionHandler: ApproveCorrectionHandler,
    private readonly rejCorrectionHandler: RejectCorrectionHandler,
    private readonly reopenHandler: ReopenAttendanceHandler
  ) {}

  private extractActorRoles(ctx: PlatformContext): string[] {
    // In a real implementation, this would map the ctx user claims to platform roles
    return ctx.roles || [];
  }

  async submitMuster(ctx: PlatformContext, musterId: string, reason?: string) {
    const cmd = new SubmitAttendanceCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
    return this.submitHandler.execute(cmd);
  }

  async validateMuster(ctx: PlatformContext, musterId: string, reason?: string) {
    const cmd = new ValidateAttendanceCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
    return this.validateHandler.execute(cmd);
  }

  async startReview(ctx: PlatformContext, musterId: string, reason?: string) {
    const cmd = new StartReviewCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
    return this.startReviewHandler.execute(cmd);
  }

  async lockMuster(ctx: PlatformContext, musterId: string, reason?: string) {
    const cmd = new LockAttendanceCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
    return this.lockHandler.execute(cmd);
  }

  async requestCorrection(ctx: PlatformContext, musterId: string, reason?: string) {
    const cmd = new RequestCorrectionCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
    return this.reqCorrectionHandler.execute(cmd);
  }

  async approveCorrection(ctx: PlatformContext, musterId: string, reason?: string) {
    const cmd = new ApproveCorrectionCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
    return this.appCorrectionHandler.execute(cmd);
  }

  async rejectCorrection(ctx: PlatformContext, musterId: string, reason?: string) {
    const cmd = new RejectCorrectionCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
    return this.rejCorrectionHandler.execute(cmd);
  }

  async reopenMuster(ctx: PlatformContext, musterId: string, reason?: string) {
    const cmd = new ReopenAttendanceCommand(musterId, ctx.userId, this.extractActorRoles(ctx), ctx.correlationId, reason);
    return this.reopenHandler.execute(cmd);
  }

  // Deprecated/Moved: These methods exist to satisfy verify-attendance.ts for now.
  // They should be moved to a dedicated AttendancePunchService.
  async ingestPunch(ctx: PlatformContext, employeeId: string, punchData: { timestamp: Date, punchType: string, sourceId: string }) {
    throw new Error('Moved to Punch Service');
  }

  async markLossOfPay(ctx: PlatformContext, employeeId: string, date: Date, units: number, reason: string): Promise<any> {
    throw new Error('Moved to Calculation Service');
  }
}
