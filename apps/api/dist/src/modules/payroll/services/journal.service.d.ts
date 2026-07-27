import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class JournalService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    exportToErp(ctx: any, runId: string, erpProvider: 'SAP' | 'Oracle' | 'Tally'): Promise<any>;
}
//# sourceMappingURL=journal.service.d.ts.map