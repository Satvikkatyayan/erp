import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayPayrollPeriodRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, tx?: any): Promise<any>;
    save(data: any, tx?: any): Promise<any>;
}
//# sourceMappingURL=payroll-period.repository.d.ts.map