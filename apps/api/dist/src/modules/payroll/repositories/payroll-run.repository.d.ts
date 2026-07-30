import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollRunRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, tx?: any): Promise<any>;
    save(data: any, tx?: any): Promise<any>;
    getDashboardStats(tenantId: string): Promise<any>;
    getRunSummary(tenantId: string, runId: string): Promise<any>;
    getRunDetails(tenantId: string, runId: string): Promise<any>;
    searchAndFilterRuns(tenantId: string, query: string, filters: any, limit: number, offset: number): Promise<any[]>;
    getOrganizationalSummary(tenantId: string, type: string): Promise<any[]>;
}
//# sourceMappingURL=payroll-run.repository.d.ts.map