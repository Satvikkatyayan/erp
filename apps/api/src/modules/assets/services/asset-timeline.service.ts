import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AssetTimelineService {
  private readonly logger = new Logger(AssetTimelineService.name);
  constructor(private readonly prisma: PrismaService) {}

  async logEvent(ctx: PlatformContext, assetId: string, eventType: string, eventData: any, triggeredBy?: string) {
    this.logger.debug(`Timeline: ${eventType} for asset=${assetId}`);
    return this.prisma.assetTimeline.create({
      data: {
        tenantId: ctx.tenantId,
        assetId,
        eventType,
        eventData,
        triggeredBy,
      }
    });
  }
}
