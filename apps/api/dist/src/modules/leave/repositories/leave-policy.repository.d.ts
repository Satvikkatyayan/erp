import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class LeavePolicyRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findLeavePolicy(tenantId: string, id: string, tx?: any): Promise<any>;
    listLeavePolicies(tenantId: string, filters: any, sort?: any, tx?: any): Promise<any[]>;
}
//# sourceMappingURL=leave-policy.repository.d.ts.map