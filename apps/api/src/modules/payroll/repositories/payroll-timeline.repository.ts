import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayPayrollTimelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByRunId(payrollRunId: string, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    return client.payPayrollTimeline.findMany({
      where: { payrollRunId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payPayrollTimeline.create({ data });
  }
}
