import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class EmployeeRequestService {
    private readonly sdk;
    private readonly logger;
    constructor(sdk: PlatformSDK);
    submitLeaveRequest(ctx: PlatformContext, requestPayload: any): Promise<any>;
    submitExpenseClaim(ctx: PlatformContext, claimPayload: any): Promise<any>;
}
//# sourceMappingURL=employee-request.service.d.ts.map