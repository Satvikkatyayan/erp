import { Injectable, Logger } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { TeamScopeResolver } from '../resolvers/team-scope.resolver';
import { ManagerTeamService } from '../services/manager-team.service';
import { ManagerDashboardService } from '../services/manager-dashboard.service';

@Injectable()
export class ManagerFacade {
  private readonly logger = new Logger(ManagerFacade.name);

  constructor(
    private readonly scopeResolver: TeamScopeResolver,
    private readonly teamService: ManagerTeamService,
    private readonly dashboardService: ManagerDashboardService
  ) {}

  async getDashboard(ctx: PlatformContext) {
    return this.dashboardService.getDashboard(ctx);
  }

  async getTeamDirectory(ctx: PlatformContext) {
    const scopeIds = await this.scopeResolver.resolveAuthorizedTeamIds(ctx);
    return this.teamService.getDirectory(ctx, scopeIds);
  }
}
