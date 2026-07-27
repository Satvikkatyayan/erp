import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse, PagedResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Corporate Card Queries')
@Controller('query/corporate-cards')
export class CorporateCardQueryController {
  constructor(private readonly readFacade: ExpenseReadFacade) {}

  @Get('assigned')
  @Roles('Finance')
  @ApiOperation({ summary: 'Get assigned cards' })
  @ApiResponse({ type: PagedResponse })
  async getAssignedCards(): Promise<PagedResponse> {
    const data = await this.readFacade.corporateCardQuery.getAssignedCards('');
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }

  @Get('transactions/:cardId')
  @Roles('Finance')
  @ApiOperation({ summary: 'Get card transactions' })
  @ApiResponse({ type: PagedResponse })
  async getTransactions(@Param('cardId') cardId: string): Promise<PagedResponse> {
    const data = await this.readFacade.corporateCardQuery.getTransactions(cardId);
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }

  @Get('outstanding/:cardId')
  @Roles('Finance')
  @ApiOperation({ summary: 'Get outstanding reconciliation' })
  @ApiResponse({ type: PagedResponse })
  async getOutstandingReconciliation(@Param('cardId') cardId: string): Promise<PagedResponse> {
    const data = await this.readFacade.corporateCardQuery.getOutstandingTransactions(cardId);
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }
}
