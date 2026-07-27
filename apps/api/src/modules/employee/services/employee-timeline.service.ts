import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class EmployeeTimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async logEvent(employeeId: string, eventType: string, description: string, metadata?: any) {
    return this.prisma.empEmployeeTimeline.create({
      data: {
        employeeId,
        eventType,
        description,
        metadata
      }
    });
  }
}
