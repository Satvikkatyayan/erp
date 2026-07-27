import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class LeaveQueryService {
  private readonly logger = new Logger(LeaveQueryService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getLeaveBalances(ctx: PlatformContext) {
    return this.prisma.leaveBalance.findMany({
      where: { employeeId: ctx.userId },
      include: {
        leaveType: true
      }
    });
  }

  async getPendingRequests(ctx: PlatformContext) {
    return this.prisma.leaveRequest.findMany({
      where: { employeeId: ctx.userId, status: 'PENDING' }
    });
  }
}
