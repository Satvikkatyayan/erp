import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollCalculationRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, tx?: any): Promise<any>;
    save(data: any, tx?: any): Promise<any>;
    getEmployeePayrollSummary(tenantId: string, employeeId: string, runId: string): Promise<any>;
    getEmployeePayrollHistory(tenantId: string, employeeId: string, limit: number, offset: number): Promise<any[]>;
    getCalculationBreakdown(tenantId: string, calculationId: string): Promise<any[]>;
}
//# sourceMappingURL=payroll-calculation.repository.d.ts.map