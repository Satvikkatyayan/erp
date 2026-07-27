import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseFacade } from '../facades/expense.facade';
import { CorporateCardMapper } from '../mappers/corporate-card.mapper';
import { AssignCorporateCardDto, ImportStatementDto } from '../dto/requests/corporate-card.dto';
import { CommandResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Corporate Cards')
@Controller('corporate-cards')
export class CorporateCardController {
  constructor(
    private readonly facade: ExpenseFacade,
    private readonly mapper: CorporateCardMapper,
  ) {}

  @Post('assign')
  @Roles('Finance')
  @ApiOperation({ summary: 'Assign corporate card' })
  @ApiResponse({ type: CommandResponse })
  async assignCard(@Body() dto: AssignCorporateCardDto): Promise<CommandResponse> {
    const command = this.mapper.toAssignCommand(dto);
    await this.facade.executeCommand('ASSIGN_CARD', command);
    return { success: true };
  }

  @Post('import')
  @Roles('Finance')
  @ApiOperation({ summary: 'Import statement' })
  @ApiResponse({ type: CommandResponse })
  async importStatement(@Body() dto: ImportStatementDto): Promise<CommandResponse> {
    const command = this.mapper.toImportCommand(dto);
    await this.facade.executeCommand('IMPORT_STATEMENT', command);
    return { success: true };
  }

  @Post('reconcile/:id')
  @Roles('Finance')
  @ApiOperation({ summary: 'Reconcile card' })
  @ApiResponse({ type: CommandResponse })
  async reconcileCard(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('RECONCILE_CARD', { id, ...dto });
    return { success: true };
  }

  @Post('close/:id')
  @Roles('Finance')
  @ApiOperation({ summary: 'Close reconciliation' })
  @ApiResponse({ type: CommandResponse })
  async closeReconciliation(@Param('id') id: string): Promise<CommandResponse> {
    await this.facade.executeCommand('CLOSE_RECONCILIATION', { id });
    return { success: true };
  }
}
