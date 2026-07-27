import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ManagerPreferenceService {
  private readonly logger = new Logger(ManagerPreferenceService.name);

  constructor(private readonly prisma: PrismaService) {}

  async updatePreferences(ctx: PlatformContext, payload: any) {
    return this.prisma.mssPreference.upsert({
      where: { managerId: ctx.employeeId },
      create: {
        tenantId: ctx.tenantId,
        managerId: ctx.employeeId,
        ...payload
      },
      update: { ...payload }
    });
  }
}
