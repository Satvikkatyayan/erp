import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ApprovalFacade } from '../facades/approval.facade';

@Injectable()
export class ManagerApprovalService {
  private readonly logger = new Logger(ManagerApprovalService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly approvalFacade: ApprovalFacade
  ) {}

  async getPendingApprovals(ctx: PlatformContext) {
    return this.prisma.mssApprovalView.findMany({
      where: { managerId: ctx.employeeId, status: 'PENDING' },
      orderBy: { createdAt: 'desc' }
    });
  }

  async processApproval(ctx: PlatformContext, approvalId: string, action: 'APPROVE' | 'REJECT', reason?: string) {
    const approval = await this.prisma.mssApprovalView.findUnique({ where: { id: approvalId } });
    if (!approval || approval.managerId !== ctx.employeeId) {
      throw new Error('Approval not found or unauthorized');
    }

    if (action === 'APPROVE') {
      await this.approvalFacade.approve(ctx, approval.workflowId);
    } else {
      await this.approvalFacade.reject(ctx, approval.workflowId, reason || '');
    }

    return this.prisma.mssApprovalView.update({
      where: { id: approvalId },
      data: { status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
    });
  }
}
