import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AttendanceReviewRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        role: string;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.AttendanceReviewStatus;
        musterId: string;
        reviewerId: string;
        remarks: string | null;
        reviewedAt: Date | null;
    }>;
}
//# sourceMappingURL=attendance-review.repository.d.ts.map