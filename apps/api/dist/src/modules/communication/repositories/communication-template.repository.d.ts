import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class CommunicationTemplateRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTemplate(tenantId: string, templateData: any, versionData: any, tx?: any): Promise<any>;
    publishVersion(tenantId: string, templateId: string, versionId: string, tx?: any): Promise<any>;
    getTemplates(tenantId: string, tx?: any): Promise<any>;
    getPublishedTemplateByCode(tenantId: string, code: string, tx?: any): Promise<any>;
    runInTransaction<T>(work: (tx: any) => Promise<T>): Promise<T>;
}
//# sourceMappingURL=communication-template.repository.d.ts.map