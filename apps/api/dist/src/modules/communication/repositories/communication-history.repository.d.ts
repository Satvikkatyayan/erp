import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class CommunicationHistoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createHistory(tenantId: string, data: any, tx?: any): Promise<any>;
    getHistoryByTenant(tenantId: string, filters?: any, tx?: any): Promise<any>;
}
//# sourceMappingURL=communication-history.repository.d.ts.map