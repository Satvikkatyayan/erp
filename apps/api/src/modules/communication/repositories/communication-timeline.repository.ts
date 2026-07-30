import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class CommunicationTimelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTimelineEntry(tenantId: string, historyId: string, action: string, data: any, tx?: any) {
    const db = tx || this.prisma;
    return db.communicationTimeline.create({
      data: {
        tenantId,
        historyId,
        action,
        actor: data.actor || 'SYSTEM',
        reason: data.reason,
        payload: data.payload,
      },
    });
  }
}
