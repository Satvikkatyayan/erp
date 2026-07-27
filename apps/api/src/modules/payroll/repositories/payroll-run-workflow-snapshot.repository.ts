import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayPayrollRunWorkflowSnapshotRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payPayrollRunWorkflowSnapshot.create({ data });
  }

  async findByRunId(payrollRunId: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payPayrollRunWorkflowSnapshot.findUnique({
      where: { payrollRunId }
    });
  }
}
