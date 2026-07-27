import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { EmployeeHierarchyQueryService } from '../../employee/services/employee-hierarchy-query.service';

@Injectable()
export class TeamScopeResolver {
  private readonly logger = new Logger(TeamScopeResolver.name);

  constructor(
    private readonly hierarchyQuery: EmployeeHierarchyQueryService
  ) {}

  async resolveAuthorizedTeamIds(ctx: PlatformContext): Promise<string[]> {
    // Determine policies based on feature flags or global settings
    const allowIndirect = ctx.featureFlags['MSS_ALLOW_INDIRECT'] !== false;
    const maxDepth = allowIndirect ? 5 : 1; // Simplistic depth logic for now
    
    // Resolve scope
    return this.hierarchyQuery.getTeamScopeIds(ctx, ctx.employeeId, allowIndirect, maxDepth);
  }

  async validateAccess(ctx: PlatformContext, targetEmployeeId: string) {
    const scopeIds = await this.resolveAuthorizedTeamIds(ctx);
    if (!scopeIds.includes(targetEmployeeId) && ctx.employeeId !== targetEmployeeId) {
      throw new ForbiddenException('You are not authorized to access this employee\'s data.');
    }
  }
}
