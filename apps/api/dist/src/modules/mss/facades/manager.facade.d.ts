import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { TeamScopeResolver } from '../resolvers/team-scope.resolver';
import { ManagerTeamService } from '../services/manager-team.service';
import { ManagerDashboardService } from '../services/manager-dashboard.service';
export declare class ManagerFacade {
    private readonly scopeResolver;
    private readonly teamService;
    private readonly dashboardService;
    private readonly logger;
    constructor(scopeResolver: TeamScopeResolver, teamService: ManagerTeamService, dashboardService: ManagerDashboardService);
    getDashboard(ctx: PlatformContext): Promise<{
        widgets: {};
    }>;
    getTeamDirectory(ctx: PlatformContext): Promise<{
        id: string;
        name: string;
        position: string;
        status: string;
    }[]>;
}
//# sourceMappingURL=manager.facade.d.ts.map