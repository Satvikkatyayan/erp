import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class LeaveRequestRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createLeaveRequest(tenantId: string, data: any, tx?: any): Promise<any>;
    findLeaveRequestById(tenantId: string, id: string, tx?: any): Promise<any>;
    findLeaveRequestByNumber(tenantId: string, leaveNumber: string, tx?: any): Promise<any>;
    updateLeaveRequest(tenantId: string, id: string, data: any, tx?: any): Promise<any>;
    deleteLeaveRequest(tenantId: string, id: string, tx?: any): Promise<any>;
    searchLeaveRequests(tenantId: string, filters: any, sort?: any, tx?: any): Promise<any[]>;
}
//# sourceMappingURL=leave-request.repository.d.ts.map