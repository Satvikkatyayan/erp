import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class MssEventListener {
  private readonly logger = new Logger(MssEventListener.name);
  constructor(private readonly prisma: PrismaService) {}

  async handleApprovalRequested(ctx: PlatformContext, payload: any) {
    this.logger.debug(`Handling Approval Requested Event: ${payload.workflowId}`);
    await this.prisma.mssApprovalView.create({
      data: {
        tenantId: ctx.tenantId,
        managerId: payload.managerId,
        submittedById: payload.employeeId,
        sourceModule: payload.module,
        workflowId: payload.workflowId,
        payloadSummary: payload.summary,
      }
    });
  }
}
