import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class ApprovalFacade {
  private readonly logger = new Logger(ApprovalFacade.name);

  constructor(
    private readonly sdk: PlatformSDK
  ) {}

  async approve(ctx: PlatformContext, workflowId: string, payload?: any) {
    this.logger.debug(`Approving workflow ${workflowId}`);
    return this.sdk.workflow.trigger(ctx, workflowId); // Mapping to SDK properly later
  }

  async reject(ctx: PlatformContext, workflowId: string, reason: string) {
    this.logger.debug(`Rejecting workflow ${workflowId}`);
    return this.sdk.workflow.trigger(ctx, workflowId);
  }
}
