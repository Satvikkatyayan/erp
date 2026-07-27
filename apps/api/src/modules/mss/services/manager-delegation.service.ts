import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ManagerDelegationService {
  private readonly logger = new Logger(ManagerDelegationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createDelegation(ctx: PlatformContext, payload: any) {
    if (ctx.employeeId === payload.delegatedToId) throw new Error('Cannot delegate to self');
    // Policy checks would go here

    return this.prisma.mssDelegation.create({
      data: {
        tenantId: ctx.tenantId,
        managerId: ctx.employeeId,
        delegatedToId: payload.delegatedToId,
        scope: payload.scope || 'ALL',
        effectiveFrom: new Date(payload.effectiveFrom),
        effectiveTo: new Date(payload.effectiveTo),
        reason: payload.reason
      }
    });
  }
}
