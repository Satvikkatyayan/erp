import { Injectable, Logger } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class EssEventPublisher {
  private readonly logger = new Logger(EssEventPublisher.name);
  constructor(private readonly sdk: PlatformSDK) {}

  async publishDocumentViewed(ctx: PlatformContext, documentId: string) {
    await this.sdk.events.publish(ctx, 'EssDocumentViewed', { employeeId: ctx.employeeId, documentId });
  }

  async publishDocumentDownloaded(ctx: PlatformContext, documentId: string) {
    await this.sdk.events.publish(ctx, 'EssDocumentDownloaded', { employeeId: ctx.employeeId, documentId });
  }

  async publishPolicyAcknowledged(ctx: PlatformContext, documentId: string | null, policyName: string | null) {
    await this.sdk.events.publish(ctx, 'EssPolicyAcknowledged', { employeeId: ctx.employeeId, documentId, policyName });
  }
}
