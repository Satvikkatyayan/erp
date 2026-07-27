import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayPayrollCalculationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payPayrollCalculation.findUnique({ where: { id } });
  }

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    if (data.id) {
      return client.payPayrollCalculation.update({ where: { id: data.id }, data });
    }
    return client.payPayrollCalculation.create({ data });
  }
  async getEmployeePayrollSummary(tenantId: string, employeeId: string, runId: string): Promise<any> {
    return this.prisma.payPayrollCalculation.findFirst({
      where: { payrollRunId: runId, employeeId }
    });
  }

  async getEmployeePayrollHistory(tenantId: string, employeeId: string, limit: number, offset: number): Promise<any[]> {
    return this.prisma.payPayrollCalculation.findMany({
      where: { employeeId },
      include: {
        payrollRun: true
      },
      take: limit,
      skip: offset
    });
  }

  async getCalculationBreakdown(tenantId: string, calculationId: string): Promise<any[]> {
    return this.prisma.payCalculationStep.findMany({
      where: { calculationId }
    });
  }
}

