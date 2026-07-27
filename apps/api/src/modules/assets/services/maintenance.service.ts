import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class MaintenanceService {
  private readonly logger = new Logger(MaintenanceService.name);
  constructor(private readonly prisma: PrismaService) {}

  async scheduleMaintenance(ctx: PlatformContext, assetId: string, title: string, frequency: string, nextScheduledAt: Date) {
    this.logger.log(`Scheduling maintenance for ${assetId}`);
    return this.prisma.assetMaintenanceSchedule.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        title,
        frequency,
        nextScheduledAt,
      }
    });
  }
}
