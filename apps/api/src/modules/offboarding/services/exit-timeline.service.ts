import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class ExitTimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async logEvent(requestId: string, event: string, actorId: string, description?: string) {
    await this.prisma.exitTimeline.create({
      data: {
        requestId,
        event,
        actorId,
        description
      }
    });
  }
}
