import { Injectable } from '@nestjs/common';
import { IMssDashboardWidget, DashboardWidgetRegistry } from './dashboard-widget.registry';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { TeamScopeResolver } from '../resolvers/team-scope.resolver';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class TeamSummaryWidget implements IMssDashboardWidget {
  get key(): string { return 'TeamSummary'; }

  constructor(
    private readonly registry: DashboardWidgetRegistry,
    private readonly scopeResolver: TeamScopeResolver,
    private readonly prisma: PrismaService
  ) {
    this.registry.register(this);
  }

  async render(ctx: PlatformContext, config?: any): Promise<any> {
    const scopeIds = await this.scopeResolver.resolveAuthorizedTeamIds(ctx);
    const headcount = scopeIds.length;
    return {
      title: "Team Overview",
      headcount,
      presentToday: headcount,
      onLeave: 0
    };
  }
}
