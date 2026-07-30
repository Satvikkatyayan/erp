import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayPayrollAdjustmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAdjustmentsForEmployee(tenantId: string, employeeId: string): Promise<any[]> {
    return this.prisma.payPayrollAdjustment.findMany({
      where: { tenantId, employeeId }
    });
  }

  async exists(tenantId: string, employeeId: string, type: string, reason: string): Promise<boolean> {
    const count = await this.prisma.payPayrollAdjustment.count({
      where: { tenantId, employeeId, type, reason, status: { not: 'Cancelled' } }
    });
    return count > 0;
  }
}
