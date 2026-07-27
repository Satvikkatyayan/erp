import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PayrollFormulaEngine {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    evaluateComponent(ctx: any, employeeId: string, componentCode: string, inputs: Record<string, number>): Promise<number>;
}
//# sourceMappingURL=payroll-formula.engine.d.ts.map