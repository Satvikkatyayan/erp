import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AttendanceTimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async recordEvent(ctx: PlatformContext, attendanceDayId: string, eventType: string, description: string) {
    await this.prisma.attAttendanceTimeline.create({
        data: {
            tenantId: ctx.tenantId,
            attendanceDayId,
            eventType,
            description,
            actorId: ctx.userId
        }
    });
  }
}
