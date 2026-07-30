import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayJournalRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createJournal(tenantId: string, payrollRunId: string, versionNumber: number, tx?: any): Promise<any>;
    createEntries(entries: any[], tx?: any): Promise<void>;
    getJournal(tenantId: string, payrollRunId: string): Promise<any | null>;
    getHistory(tenantId: string, payrollRunId: string): Promise<any[]>;
    getEntries(journalId: string): Promise<any[]>;
    createVersion(tenantId: string, payrollRunId: string, tx?: any): Promise<any>;
    exists(tenantId: string, payrollRunId: string): Promise<boolean>;
}
//# sourceMappingURL=journal.repository.d.ts.map