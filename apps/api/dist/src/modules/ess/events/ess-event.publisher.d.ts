import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class EssEventPublisher {
    private readonly sdk;
    private readonly logger;
    constructor(sdk: PlatformSDK);
    publishDocumentViewed(ctx: PlatformContext, documentId: string): Promise<void>;
    publishDocumentDownloaded(ctx: PlatformContext, documentId: string): Promise<void>;
    publishPolicyAcknowledged(ctx: PlatformContext, documentId: string | null, policyName: string | null): Promise<void>;
}
//# sourceMappingURL=ess-event.publisher.d.ts.map