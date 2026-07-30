import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class LeaveBalanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findEmployeeLeaveBalance(tenantId: string, employeeId: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.leaveBalance.findMany({
      where: { tenantId, employeeId }
    });
  }

  async updateLeaveBalance(tenantId: string, id: string, data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.leaveBalance.updateMany({
      where: { tenantId, id },
      data
    });
  }

  async listLeaveBalances(tenantId: string, filters: any, sort?: any, tx?: any): Promise<any[]> {
    const client = tx || this.prisma;
    const orderBy = sort || { createdAt: 'desc' };
    return client.leaveBalance.findMany({
      where: { tenantId, ...filters },
      orderBy
    });
  }
}
