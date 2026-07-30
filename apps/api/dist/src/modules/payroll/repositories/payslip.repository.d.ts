import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayslipRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, tx?: any): Promise<any>;
    save(data: any, tx?: any): Promise<any>;
    createVersion(calculationId: string, tenantId: string, payslipData: any, documentUrl?: string | null, tx?: any): Promise<any>;
    getLatest(calculationId: string, tenantId: string): Promise<any | null>;
    getVersion(calculationId: string, tenantId: string, versionNumber: number): Promise<any | null>;
    getHistory(calculationId: string, tenantId: string): Promise<any[]>;
    exists(calculationId: string, tenantId: string): Promise<boolean>;
    getEmployeePayslipHistory(tenantId: string, employeeId: string, limit: number, offset: number): Promise<any[]>;
    getPayslips(ctx: any): Promise<any[]>;
    getLatestPayslip(ctx: any): Promise<any | null>;
}
//# sourceMappingURL=payslip.repository.d.ts.map