import { IMssDashboardWidget, DashboardWidgetRegistry } from './dashboard-widget.registry';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { TeamScopeResolver } from '../resolvers/team-scope.resolver';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class TeamSummaryWidget implements IMssDashboardWidget {
    private readonly registry;
    private readonly scopeResolver;
    private readonly prisma;
    get key(): string;
    constructor(registry: DashboardWidgetRegistry, scopeResolver: TeamScopeResolver, prisma: PrismaService);
    render(ctx: PlatformContext, config?: any): Promise<any>;
}
//# sourceMappingURL=team-summary.widget.d.ts.map