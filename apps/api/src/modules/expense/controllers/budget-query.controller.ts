import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Budget Queries')
@Controller('query/budget')
export class BudgetQueryController {
  constructor(private readonly readFacade: ExpenseReadFacade) {}

  @Get('department/:id')
  @Roles('Manager', 'Finance')
  @ApiOperation({ summary: 'Get department budgets' })
  @ApiResponse({ type: QueryResponse })
  async getDepartmentBudget(@Param('id') id: string): Promise<QueryResponse> {
    const data = await this.readFacade.budgetQuery.getDepartmentBudget(id);
    return { data };
  }

  @Get('utilization/:id')
  @Roles('Manager', 'Finance')
  @ApiOperation({ summary: 'Get budget utilization' })
  @ApiResponse({ type: QueryResponse })
  async getBudgetUtilization(@Param('id') id: string): Promise<QueryResponse> {
    const data = await this.readFacade.budgetQuery.getBudgetUtilization(id);
    return { data };
  }

  @Get('remaining/:id')
  @Roles('Manager', 'Finance')
  @ApiOperation({ summary: 'Get remaining allocations' })
  @ApiResponse({ type: QueryResponse })
  async getRemainingAllocations(@Param('id') id: string): Promise<QueryResponse> {
    const data = await this.readFacade.budgetQuery.getBudgetConsumption(id);
    return { data };
  }
}
