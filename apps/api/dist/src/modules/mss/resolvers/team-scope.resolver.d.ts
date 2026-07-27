import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { EmployeeHierarchyQueryService } from '../../employee/services/employee-hierarchy-query.service';
export declare class TeamScopeResolver {
    private readonly hierarchyQuery;
    private readonly logger;
    constructor(hierarchyQuery: EmployeeHierarchyQueryService);
    resolveAuthorizedTeamIds(ctx: PlatformContext): Promise<string[]>;
    validateAccess(ctx: PlatformContext, targetEmployeeId: string): Promise<void>;
}
//# sourceMappingURL=team-scope.resolver.d.ts.map