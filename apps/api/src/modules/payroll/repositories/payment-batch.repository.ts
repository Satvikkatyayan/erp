import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PayPaymentBatchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBatch(tenantId: string, payrollRunId: string, versionNumber: number, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    
    await client.payPaymentBatch.updateMany({
      where: { payrollRunId, tenantId, status: { in: ['Draft', 'Approved'] } },
      data: { status: 'Cancelled' }
    });

    return client.payPaymentBatch.create({
      data: {
        id: uuidv4(),
        tenantId,
        payrollRunId,
        versionNumber,
        status: 'Draft'
      }
    });
  }

  async createInstructions(instructions: any[], tx?: any): Promise<void> {
    const client = tx || this.prisma;
    if (instructions.length === 0) return;
    await client.payPaymentInstruction.createMany({
      data: instructions
    });
  }

  async getBatch(tenantId: string, payrollRunId: string): Promise<any | null> {
    return this.prisma.payPaymentBatch.findFirst({
      where: { payrollRunId, tenantId, status: { not: 'Cancelled' } },
      orderBy: { versionNumber: 'desc' },
      include: { instructions: true }
    });
  }

  async exists(tenantId: string, payrollRunId: string): Promise<boolean> {
    const count = await this.prisma.payPaymentBatch.count({
      where: { payrollRunId, tenantId, status: { not: 'Cancelled' } }
    });
    return count > 0;
  }
}
