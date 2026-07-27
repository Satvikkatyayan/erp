import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PERFORMANCE_EVENTS } from '../events/performance.events';

/**
 * Review Template Service
 * 
 * Manages versioned review templates. Templates follow DRAFT → PUBLISHED lifecycle.
 * Historical reviews permanently reference the template version active at submission.
 * 
 * Immutable versions: modifications create new versions.
 */
@Injectable()
export class ReviewTemplateService {
  private readonly logger = new Logger(ReviewTemplateService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
  ) {}

  /**
   * Create a review template.
   */
  async createTemplate(ctx: any, data: {
    name: string;
    description?: string;
  }): Promise<any> {
    const template = await this.prisma.perfReviewTemplate.create({
      data: {
        tenantId: ctx.tenantId,
        organizationId: ctx.organizationId,
        name: data.name,
        description: data.description,
        status: 'ACTIVE',
      },
    });

    this.logger.log(`Review template created: ${template.id} (${template.name})`);
    return template;
  }

  /**
   * Create a new version of a review template.
   * Starts as DRAFT — must be published before use.
   */
  async createVersion(ctx: any, templateId: string, data: {
    sectionsConfig: any;
    effectiveFrom?: Date;
  }): Promise<any> {
    // Get current max version
    const maxVersion = await this.prisma.perfReviewTemplateVersion.aggregate({
      where: { templateId, tenantId: ctx.tenantId },
      _max: { versionNumber: true },
    });

    const newVersionNumber = (maxVersion._max.versionNumber || 0) + 1;

    const version = await this.prisma.perfReviewTemplateVersion.create({
      data: {
        tenantId: ctx.tenantId,
        templateId,
        versionNumber: newVersionNumber,
        status: 'DRAFT',
        sectionsConfig: data.sectionsConfig,
        effectiveFrom: data.effectiveFrom,
      },
    });

    this.logger.log(`Template version created: ${templateId} V${newVersionNumber} (DRAFT)`);
    return version;
  }

  /**
   * Publish a template version. Once published, it becomes immutable.
   * Archives any previously published version of the same template.
   */
  async publishVersion(ctx: any, versionId: string): Promise<any> {
    const version = await this.prisma.perfReviewTemplateVersion.findFirst({
      where: { id: versionId, tenantId: ctx.tenantId },
    });

    if (!version) {
      throw new BadRequestException('Template version not found');
    }

    if (version.status !== 'DRAFT') {
      throw new BadRequestException('Only DRAFT versions can be published');
    }

    // Archive any currently published versions
    await this.prisma.perfReviewTemplateVersion.updateMany({
      where: { templateId: version.templateId, tenantId: ctx.tenantId, status: 'PUBLISHED' },
      data: { status: 'ARCHIVED' },
    });

    // Publish the new version
    const published = await this.prisma.perfReviewTemplateVersion.update({
      where: { id: versionId },
      data: { status: 'PUBLISHED' },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.REVIEW_TEMPLATE_VERSION_ACTIVATED, {
      templateId: version.templateId,
      versionId,
      versionNumber: version.versionNumber,
    });

    this.logger.log(`Template version published: ${versionId} (V${version.versionNumber})`);
    return published;
  }

  /**
   * Assign a template version to a review.
   * The review permanently references this version.
   */
  async assignToReview(ctx: any, reviewId: string, templateVersionId: string): Promise<void> {
    await this.prisma.perfReview.update({
      where: { id: reviewId },
      data: { templateVersionId },
    });

    await this.sdk.events.publish(ctx, PERFORMANCE_EVENTS.REVIEW_TEMPLATE_ASSIGNED, {
      reviewId,
      templateVersionId,
    });

    this.logger.log(`Template version ${templateVersionId} assigned to review ${reviewId}`);
  }

  /**
   * Get the active (PUBLISHED) version for a template.
   */
  async getActiveVersion(tenantId: string, templateId: string): Promise<any> {
    return this.prisma.perfReviewTemplateVersion.findFirst({
      where: { templateId, tenantId, status: 'PUBLISHED' },
      orderBy: { versionNumber: 'desc' },
    });
  }
}
