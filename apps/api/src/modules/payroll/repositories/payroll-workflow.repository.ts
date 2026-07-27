import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayPayrollWorkflowRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveWorkflow(tenantId: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payPayrollWorkflow.findFirst({
      where: { tenantId, isActive: true },
      include: { steps: { orderBy: { stepNumber: 'asc' } } }
    });
  }
}
