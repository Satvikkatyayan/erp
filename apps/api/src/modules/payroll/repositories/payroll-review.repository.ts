import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayPayrollReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByRunId(payrollRunId: string, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    return client.payPayrollReview.findMany({
      where: { payrollRunId },
      orderBy: { createdAt: 'asc' }
    });
  }

  async findById(id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payPayrollReview.findUnique({ where: { id } });
  }

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    if (data.id) {
      return client.payPayrollReview.update({ where: { id: data.id }, data });
    }
    return client.payPayrollReview.create({ data });
  }
}
