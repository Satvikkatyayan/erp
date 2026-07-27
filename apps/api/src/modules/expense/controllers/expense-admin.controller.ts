import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseFacade } from '../facades/expense.facade';
import { CommandResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Expense Admin')
@Controller('admin/expense')
export class ExpenseAdminController {
  constructor(private readonly facade: ExpenseFacade) {}

  @Post('policy/override/:id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Override expense policy' })
  @ApiResponse({ type: CommandResponse })
  async overridePolicy(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('OVERRIDE_POLICY', { id, ...dto });
    return { success: true };
  }

  @Post('reimbursement/approve/:id')
  @Roles('Finance')
  @ApiOperation({ summary: 'Approve reimbursement' })
  @ApiResponse({ type: CommandResponse })
  async approveReimbursement(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('APPROVE_REIMBURSEMENT', { id, ...dto });
    return { success: true };
  }

  @Post('advance/approve/:id')
  @Roles('Finance')
  @ApiOperation({ summary: 'Approve advances' })
  @ApiResponse({ type: CommandResponse })
  async approveAdvance(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('APPROVE_ADVANCE', { id, ...dto });
    return { success: true };
  }

  @Post('budgets/:id')
  @Roles('Admin')
  @ApiOperation({ summary: 'Manage budgets' })
  @ApiResponse({ type: CommandResponse })
  async manageBudgets(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('MANAGE_BUDGET', { id, ...dto });
    return { success: true };
  }

  @Post('replay')
  @Roles('Admin')
  @ApiOperation({ summary: 'Trigger event replay' })
  @ApiResponse({ type: CommandResponse })
  async triggerReplay(@Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('TRIGGER_REPLAY', dto);
    return { success: true };
  }

  @Post('rebuild')
  @Roles('Admin')
  @ApiOperation({ summary: 'Trigger projection rebuild' })
  @ApiResponse({ type: CommandResponse })
  async triggerRebuild(@Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('TRIGGER_REBUILD', dto);
    return { success: true };
  }
}
