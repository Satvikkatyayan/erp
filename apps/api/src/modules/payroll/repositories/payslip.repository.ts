import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayPayslipRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payPayslip.findUnique({ where: { id } });
  }

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    if (data.id) {
      return client.payPayslip.update({ where: { id: data.id }, data });
    }
    return client.payPayslip.create({ data });
  }
  async getEmployeePayslipHistory(tenantId: string, employeeId: string, limit: number, offset: number): Promise<any[]> {
    return this.prisma.payPayslip.findMany({
      where: {
        tenantId,
        calculation: { employeeId }
      },
      take: limit,
      skip: offset,
      orderBy: { id: 'desc' }
    });
  }

  async getPayslips(ctx: any): Promise<any[]> {
    // Assuming ctx contains userId and we need to resolve employeeId, but for now just mock/return empty or resolve if we had employee context.
    // If ctx provides employeeId directly:
    return this.prisma.payPayslip.findMany({
      where: {
        tenantId: ctx.tenantId,
        calculation: { employeeId: ctx.userId } // Or mapped from userId
      },
      orderBy: { id: 'desc' }
    });
  }

  async getLatestPayslip(ctx: any): Promise<any | null> {
    const list = await this.getPayslips(ctx);
    return list.length > 0 ? list[0] : null;
  }
}


