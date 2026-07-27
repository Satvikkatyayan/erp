import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class MssEventPublisher {
    private readonly sdk;
    private readonly logger;
    constructor(sdk: PlatformSDK);
    publishDelegationCreated(ctx: PlatformContext, delegationId: string): Promise<void>;
}
//# sourceMappingURL=mss-event.publisher.d.ts.map