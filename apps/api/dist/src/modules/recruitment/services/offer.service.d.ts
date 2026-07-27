import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class OfferService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createOfferVersion(applicationId: string, payload: any, version: number): Promise<{
        currency: string;
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        version: number;
        createdBy: string | null;
        updatedBy: string | null;
        documentUrl: string | null;
        applicationId: string;
        baseSalary: number;
        bonus: number | null;
        validUntil: Date;
    }>;
}
//# sourceMappingURL=offer.service.d.ts.map