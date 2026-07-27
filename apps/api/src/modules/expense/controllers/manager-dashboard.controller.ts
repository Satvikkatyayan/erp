import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse, PagedResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Manager Dashboard')
@Controller('query/manager-dashboard')
export class ManagerDashboardController {
  constructor(private readonly readFacade: ExpenseReadFacade) {}

  @Get('pending-approvals')
  @Roles('Manager')
  @ApiOperation({ summary: 'Get pending approvals' })
  @ApiResponse({ type: PagedResponse })
  async getPendingApprovals(): Promise<PagedResponse> {
    const data = await this.readFacade.expenseQuery.getManagerApprovalQueue('');
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }

  @Get('team-expenses/:teamId')
  @Roles('Manager')
  @ApiOperation({ summary: 'Get team expenses' })
  @ApiResponse({ type: PagedResponse })
  async getTeamExpenses(@Param('teamId') teamId: string): Promise<PagedResponse> {
    const data = await this.readFacade.expenseQuery.searchClaims({ teamId });
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }

  @Get('risk-summaries')
  @Roles('Manager')
  @ApiOperation({ summary: 'Get risk summaries' })
  @ApiResponse({ type: QueryResponse })
  async getRiskSummaries(): Promise<QueryResponse> {
    const data = await this.readFacade.expenseQuery.searchClaims({ includeRisk: true });
    return { data };
  }
}
