import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse, PagedResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Expense Queries')
@Controller('query/expense')
export class ExpenseQueryController {
  constructor(private readonly readFacade: ExpenseReadFacade) {}

  @Get('my-expenses')
  @Roles('Employee')
  @ApiOperation({ summary: 'Get my expenses' })
  @ApiResponse({ type: PagedResponse })
  async getMyExpenses(@Query() params: any): Promise<PagedResponse> {
    const data = await this.readFacade.expenseQuery.getEmployeeClaims(params);
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }

  @Get(':id')
  @Roles('Employee', 'Manager', 'Finance')
  @ApiOperation({ summary: 'Get expense detail' })
  @ApiResponse({ type: QueryResponse })
  async getExpenseDetail(@Param('id') id: string): Promise<QueryResponse> {
    const data = await this.readFacade.expenseQuery.getClaim(id);
    return { data };
  }

  @Get('pending-reimbursements')
  @Roles('Finance')
  @ApiOperation({ summary: 'Get pending reimbursements' })
  @ApiResponse({ type: PagedResponse })
  async getPendingReimbursements(): Promise<PagedResponse> {
    const data = await this.readFacade.expenseQuery.getClaimsByStatus('APPROVED_PENDING_REIMBURSEMENT');
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }

  @Get('dashboard')
  @Roles('Employee')
  @ApiOperation({ summary: 'Get employee dashboard' })
  @ApiResponse({ type: QueryResponse })
  async getEmployeeDashboard(): Promise<QueryResponse> {
    const data = await this.readFacade.expenseQuery.searchClaims({});
    return { data };
  }
}
