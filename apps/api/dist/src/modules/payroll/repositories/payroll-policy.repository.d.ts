import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollPolicyRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, tx?: any): Promise<any>;
    save(data: any, tx?: any): Promise<any>;
}
//# sourceMappingURL=payroll-policy.repository.d.ts.map