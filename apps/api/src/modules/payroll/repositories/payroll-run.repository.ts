import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PayPayrollRunRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    return client.payPayrollRun.findUnique({ where: { id } });
  }

  async save(data: any, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    if (data.id) {
      return client.payPayrollRun.update({ where: { id: data.id }, data });
    }
    return client.payPayrollRun.create({ data });
  }
  async getDashboardStats(tenantId: string): Promise<any> {
    const runs = await this.prisma.payPayrollRun.findMany({ where: { tenantId } });
    const draftRuns = runs.filter(r => r.status === 'Draft').length;
    const approvedRuns = runs.filter(r => r.status === 'APPROVED').length;
    const lockedRuns = runs.filter(r => r.status === 'LOCKED').length;
    const processedRuns = runs.filter(r => r.status === 'PROCESSED').length;
    
    return {
      totalPayrollRuns: runs.length,
      draftRuns,
      approvedRuns,
      lockedRuns,
      processedRuns,
      employeesProcessed: 0,
      pendingEmployees: 0,
      currentPayrollPeriod: 'Current',
      totalGrossPayroll: 0,
      totalNetPayroll: 0
    };
  }

  async getRunSummary(tenantId: string, runId: string): Promise<any> {
    return this.prisma.payPayrollRun.findFirst({
      where: { id: runId, tenantId },
      include: {
        calculations: true,
        snapshots: true
      }
    });
  }

  async getRunDetails(tenantId: string, runId: string): Promise<any> {
    return this.prisma.payPayrollRun.findFirst({
      where: { id: runId, tenantId },
      include: {
        calculations: {
          include: {
            payslips: true
          }
        },
        snapshots: true
      }
    });
  }

  async searchAndFilterRuns(tenantId: string, query: string, filters: any, limit: number, offset: number): Promise<any[]> {
    return this.prisma.payPayrollRun.findMany({
      where: {
        tenantId,
        ...filters
      },
      take: limit,
      skip: offset
    });
  }

  async getOrganizationalSummary(tenantId: string, type: string): Promise<any[]> {
    return [];
  }
}

