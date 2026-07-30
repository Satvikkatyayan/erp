import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollAdjustmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAdjustmentsForEmployee(tenantId: string, employeeId: string): Promise<any[]>;
    exists(tenantId: string, employeeId: string, type: string, reason: string): Promise<boolean>;
}
//# sourceMappingURL=payroll-adjustment.repository.d.ts.map