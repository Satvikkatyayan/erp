import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeSessionService {
  private readonly logger = new Logger(EmployeeSessionService.name);

  constructor(private readonly prisma: PrismaService) {}

  async registerDevice(ctx: PlatformContext, deviceId: string, deviceName: string) {
    return this.prisma.essDeviceRegistration.upsert({
      where: { deviceId },
      create: {
        tenantId: ctx.tenantId,
        employeeId: ctx.employeeId,
        deviceId,
        deviceName,
        isTrusted: false
      },
      update: {
        deviceName,
        lastUsedAt: new Date()
      }
    });
  }

  async createSession(ctx: PlatformContext, tokenJti: string, deviceId: string, ipAddress: string, userAgent: string, expiresAt: Date) {
    return this.prisma.essSession.create({
      data: {
        tenantId: ctx.tenantId,
        employeeId: ctx.employeeId,
        tokenJti,
        deviceId,
        ipAddress,
        userAgent,
        expiresAt
      }
    });
  }

  async getActiveSessions(ctx: PlatformContext) {
    return this.prisma.essSession.findMany({
      where: { employeeId: ctx.employeeId, expiresAt: { gt: new Date() } }
    });
  }
}
