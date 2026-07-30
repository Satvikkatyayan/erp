import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayArrearRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getArrearsForEmployee(tenantId: string, employeeId: string): Promise<any[]> {
    return this.prisma.payArrear.findMany({
      where: { tenantId, employeeId }
    });
  }

  async exists(tenantId: string, employeeId: string, previousRunId: string): Promise<boolean> {
    const count = await this.prisma.payArrear.count({
      where: { tenantId, employeeId, previousRunId, status: { not: 'Cancelled' } }
    });
    return count > 0;
  }
}
