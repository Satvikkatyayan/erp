import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeePreferenceService {
  private readonly logger = new Logger(EmployeePreferenceService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getPreferences(ctx: PlatformContext) {
    return this.prisma.essPreference.findUnique({
      where: { employeeId: ctx.employeeId }
    });
  }

  async updatePreferences(ctx: PlatformContext, payload: any) {
    return this.prisma.essPreference.upsert({
      where: { employeeId: ctx.employeeId },
      create: {
        tenantId: ctx.tenantId,
        employeeId: ctx.employeeId,
        ...payload
      },
      update: {
        ...payload
      }
    });
  }
}
