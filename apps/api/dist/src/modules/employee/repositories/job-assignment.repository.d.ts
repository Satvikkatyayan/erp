import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmpJobAssignmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createJobAssignment(tenantId: string, employeeId: string, data: any, tx?: any): Promise<any>;
    getCurrentJobAssignment(tenantId: string, employeeId: string, tx?: any): Promise<any>;
    findCurrentJobAssignment(tenantId: string, employeeId: string, tx?: any): Promise<any>;
    closeCurrentJobAssignment(tenantId: string, employeeId: string, effectiveTo: Date, tx?: any): Promise<any>;
    findAssignmentHistory(tenantId: string, employeeId: string, tx?: any): Promise<any[]>;
}
//# sourceMappingURL=job-assignment.repository.d.ts.map