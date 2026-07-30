import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class CommunicationTemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTemplate(tenantId: string, templateData: any, versionData: any, tx?: any) {
    const db = tx || this.prisma;
    return db.communicationTemplate.create({
      data: {
        tenantId,
        code: templateData.code,
        name: templateData.name,
        description: templateData.description,
        channel: templateData.channel,
        versions: {
          create: [
            {
              tenantId,
              version: 1,
              status: 'DRAFT',
              subject: versionData.subject,
              body: versionData.body,
              variables: {
                create: versionData.variables.map((v: any) => ({
                  tenantId,
                  name: v.name,
                  type: v.type,
                  required: v.required !== undefined ? v.required : true,
                })),
              },
            },
          ],
        },
      },
      include: {
        versions: {
          include: {
            variables: true,
          },
        },
      },
    });
  }

  async publishVersion(tenantId: string, templateId: string, versionId: string, tx?: any) {
    const db = tx || this.prisma;
    
    // According to strategy: modifications create new draft, then publish. 
    // Wait, the rule is only one Published version at a time per template?
    // The requirement didn't specify auto-archiving previous versions, but typically publishing archives the old one.
    // For now we just update the specific version to PUBLISHED.
    
    return db.communicationTemplateVersion.update({
      where: {
        id: versionId,
        tenantId,
        templateId,
      },
      data: {
        status: 'PUBLISHED',
      },
    });
  }

  async getTemplates(tenantId: string, tx?: any) {
    const db = tx || this.prisma;
    return db.communicationTemplate.findMany({
      where: { tenantId },
      include: {
        versions: {
          include: { variables: true },
        },
      },
    });
  }

  async getPublishedTemplateByCode(tenantId: string, code: string, tx?: any) {
    const db = tx || this.prisma;
    return db.communicationTemplate.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code,
        },
      },
      include: {
        versions: {
          where: {
            status: 'PUBLISHED',
          },
          include: {
            variables: true,
          },
        },
      },
    });
  }

  /**
   * Helper to run transactions behind the repository boundary.
   */
  async runInTransaction<T>(work: (tx: any) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(work);
  }
}
