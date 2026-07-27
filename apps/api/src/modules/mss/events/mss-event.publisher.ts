import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class MssEventPublisher {
  private readonly logger = new Logger(MssEventPublisher.name);
  constructor(private readonly sdk: PlatformSDK) {}

  async publishDelegationCreated(ctx: PlatformContext, delegationId: string) {
    await this.sdk.events.publish(ctx, 'MssDelegationCreated', { delegationId });
  }
}
