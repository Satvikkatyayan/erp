import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EssEventPublisher } from '../events/ess-event.publisher';

@Injectable()
export class EmployeeDocumentService {
  private readonly logger = new Logger(EmployeeDocumentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly publisher: EssEventPublisher
  ) {}

  async viewDocument(ctx: PlatformContext, documentId: string, ipAddress?: string, userAgent?: string) {
    await this.prisma.essDocumentAuditLog.create({
      data: {
        tenantId: ctx.tenantId,
        employeeId: ctx.employeeId,
        documentId,
        action: 'VIEWED',
        ipAddress,
        userAgent
      }
    });

    await this.publisher.publishDocumentViewed(ctx, documentId);
    return { success: true };
  }

  async downloadDocument(ctx: PlatformContext, documentId: string, ipAddress?: string, userAgent?: string) {
    await this.prisma.essDocumentAuditLog.create({
      data: {
        tenantId: ctx.tenantId,
        employeeId: ctx.employeeId,
        documentId,
        action: 'DOWNLOADED',
        ipAddress,
        userAgent
      }
    });

    await this.publisher.publishDocumentDownloaded(ctx, documentId);
    return { success: true, downloadUrl: `/api/files/${documentId}/download` };
  }

  async acknowledgePolicy(ctx: PlatformContext, documentId: string | null, policyName: string | null, ipAddress?: string, userAgent?: string) {
    await this.prisma.essAcknowledgement.create({
      data: {
        tenantId: ctx.tenantId,
        employeeId: ctx.employeeId,
        documentId,
        policyName,
        ipAddress,
        userAgent
      }
    });

    await this.publisher.publishPolicyAcknowledged(ctx, documentId, policyName);
    return { success: true };
  }
}
