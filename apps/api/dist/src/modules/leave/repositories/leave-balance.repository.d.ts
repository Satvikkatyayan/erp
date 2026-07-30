import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class LeaveBalanceRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findEmployeeLeaveBalance(tenantId: string, employeeId: string, tx?: any): Promise<any>;
    updateLeaveBalance(tenantId: string, id: string, data: any, tx?: any): Promise<any>;
    listLeaveBalances(tenantId: string, filters: any, sort?: any, tx?: any): Promise<any[]>;
}
//# sourceMappingURL=leave-balance.repository.d.ts.map