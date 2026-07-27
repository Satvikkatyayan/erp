import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class ApprovalFacade {
    private readonly sdk;
    private readonly logger;
    constructor(sdk: PlatformSDK);
    approve(ctx: PlatformContext, workflowId: string, payload?: any): Promise<any>;
    reject(ctx: PlatformContext, workflowId: string, reason: string): Promise<any>;
}
//# sourceMappingURL=approval.facade.d.ts.map