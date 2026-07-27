import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class RecruitmentTimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async recordEvent(ctx: PlatformContext, applicationId: string, eventType: string, description?: string) {
    await this.prisma.recRecruitmentTimeline.create({
      data: {
        tenantId: ctx.tenantId,
        applicationId,
        eventType,
        description,
        actorId: ctx.userId
      }
    });
  }
}
