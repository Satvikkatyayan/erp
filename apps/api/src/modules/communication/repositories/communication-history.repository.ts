import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class CommunicationHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createHistory(tenantId: string, data: any, tx?: any) {
    const db = tx || this.prisma;
    return db.communicationHistory.create({
      data: {
        tenantId,
        channel: data.channel,
        recipient: data.recipient,
        subject: data.subject,
        body: data.body,
        status: data.status,
        provider: data.provider,
      },
    });
  }

  async getHistoryByTenant(tenantId: string, filters: any = {}, tx?: any) {
    const db = tx || this.prisma;
    return db.communicationHistory.findMany({
      where: {
        tenantId,
        ...filters,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
