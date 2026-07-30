import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformEmployeeSDK } from '../../employee/sdk/platform-employee.sdk';
export declare class TeamScopeResolver {
    private readonly employeeSdk;
    private readonly logger;
    constructor(employeeSdk: PlatformEmployeeSDK);
    resolveAuthorizedTeamIds(ctx: PlatformContext): Promise<string[]>;
    validateAccess(ctx: PlatformContext, targetEmployeeId: string): Promise<void>;
}
//# sourceMappingURL=team-scope.resolver.d.ts.map