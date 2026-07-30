import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmpEmployeeTimelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTimelineEntry(tenantId: string, employeeId: string, eventType: string, eventData: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.empEmployeeTimeline.create({
      data: {
        id: uuidv4(),
        employeeId,
        eventType,
        metadata: eventData,
        eventDate: new Date(),
        description: `Timeline event: ${eventType}`
      }
    });
  }

  async getTimeline(tenantId: string, employeeId: string): Promise<any[]> {
    return this.prisma.empEmployeeTimeline.findMany({
      where: { employeeId },
      orderBy: { eventDate: 'desc' }
    });
  }
}
