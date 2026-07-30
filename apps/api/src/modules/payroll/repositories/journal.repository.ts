import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PayJournalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createJournal(tenantId: string, payrollRunId: string, versionNumber: number, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    
    // Invalidate previous versions
    await client.payPayrollJournal.updateMany({
      where: { payrollRunId, tenantId, status: { in: ['Draft', 'Published'] } },
      data: { status: 'Superseded' }
    });

    return client.payPayrollJournal.create({
      data: {
        id: uuidv4(),
        tenantId,
        payrollRunId,
        versionNumber,
        status: 'Draft'
      }
    });
  }

  async createEntries(entries: any[], tx?: any): Promise<void> {
    const client = tx || this.prisma;
    if (entries.length === 0) return;
    await client.payPayrollJournalEntry.createMany({
      data: entries
    });
  }

  async getJournal(tenantId: string, payrollRunId: string): Promise<any | null> {
    return this.prisma.payPayrollJournal.findFirst({
      where: { payrollRunId, tenantId },
      orderBy: { versionNumber: 'desc' },
      include: { entries: true }
    });
  }

  async getHistory(tenantId: string, payrollRunId: string): Promise<any[]> {
    return this.prisma.payPayrollJournal.findMany({
      where: { payrollRunId, tenantId },
      orderBy: { versionNumber: 'desc' }
    });
  }

  async getEntries(journalId: string): Promise<any[]> {
    return this.prisma.payPayrollJournalEntry.findMany({
      where: { journalId }
    });
  }

  async createVersion(tenantId: string, payrollRunId: string, tx?: any): Promise<any> {
    const client = tx || this.prisma;
    const latest = await client.payPayrollJournal.findFirst({
      where: { payrollRunId, tenantId },
      orderBy: { versionNumber: 'desc' }
    });
    const versionNumber = latest ? latest.versionNumber + 1 : 1;
    return this.createJournal(tenantId, payrollRunId, versionNumber, tx);
  }

  async exists(tenantId: string, payrollRunId: string): Promise<boolean> {
    const count = await this.prisma.payPayrollJournal.count({
      where: { payrollRunId, tenantId }
    });
    return count > 0;
  }
}
