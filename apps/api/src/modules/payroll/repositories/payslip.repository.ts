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

  async createVersion(calculationId: string, tenantId: string, payslipData: any, documentUrl: string | null = null, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    const latest = await client.payPayslip.findFirst({
      where: { calculationId, tenantId },
      orderBy: { versionNumber: 'desc' }
    });
    
    // Mark previous as superseded if needed, though instruction says "Only regenerate by creating a new version. Never overwrite."
    if (latest && latest.status === 'Draft') {
      await client.payPayslip.update({
        where: { id: latest.id },
        data: { status: 'Superseded' }
      });
    } else if (latest && latest.status === 'Published') {
      await client.payPayslip.update({
        where: { id: latest.id },
        data: { status: 'Superseded' }
      });
    }

    const versionNumber = latest ? latest.versionNumber + 1 : 1;
    payslipData.versionNumber = versionNumber; // Sync JSON model

    return client.payPayslip.create({
      data: {
        tenantId,
        calculationId,
        versionNumber,
        payslipData,
        documentUrl,
        status: 'Draft' // Initially generated as draft until explicitly published
      }
    });
  }

  async getLatest(calculationId: string, tenantId: string): Promise<any | null> {
    return this.prisma.payPayslip.findFirst({
      where: { calculationId, tenantId },
      orderBy: { versionNumber: 'desc' }
    });
  }

  async getVersion(calculationId: string, tenantId: string, versionNumber: number): Promise<any | null> {
    return this.prisma.payPayslip.findFirst({
      where: { calculationId, tenantId, versionNumber }
    });
  }

  async getHistory(calculationId: string, tenantId: string): Promise<any[]> {
    return this.prisma.payPayslip.findMany({
      where: { calculationId, tenantId },
      orderBy: { versionNumber: 'desc' }
    });
  }

  async exists(calculationId: string, tenantId: string): Promise<boolean> {
    const count = await this.prisma.payPayslip.count({
      where: { calculationId, tenantId }
    });
    return count > 0;
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
    return this.prisma.payPayslip.findMany({
      where: {
        tenantId: ctx.tenantId,
        calculation: { employeeId: ctx.userId }
      },
      orderBy: { id: 'desc' }
    });
  }

  async getLatestPayslip(ctx: any): Promise<any | null> {
    const list = await this.getPayslips(ctx);
    return list.length > 0 ? list[0] : null;
  }
}


