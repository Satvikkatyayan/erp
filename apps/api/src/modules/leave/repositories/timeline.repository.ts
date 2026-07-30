import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LeaveTimelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTimelineEntry(tenantId: string, leaveRequestId: string, action: string, performedBy: string, data?: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    // Assuming a leaveLedger or generic timeline table exists in Prisma schema.
    // Schema search showed LeaveLedger. We will use LeaveLedger as the timeline entry for Leave.
    return client.leaveLedger.create({
      data: {
        id: uuidv4(),
        leaveRequestId,
        transactionType: action,
        performedBy,
        metadata: data,
        createdAt: new Date()
      }
    });
  }

  async getTimeline(tenantId: string, leaveRequestId: string): Promise<any[]> {
    return this.prisma.leaveLedger.findMany({
      where: { leaveRequestId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
