import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayCalculationStepRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string, tx?: any): Promise<any>;
    save(data: any, tx?: any): Promise<any>;
}
//# sourceMappingURL=calculation-step.repository.d.ts.map