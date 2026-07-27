import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseFacade } from '../facades/expense.facade';
import { ApproveExpenseDto, RejectExpenseDto } from '../dto/requests/manager-approval.dto';
import { CommandResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Manager Approval')
@Controller('manager/approval')
export class ManagerApprovalController {
  constructor(private readonly facade: ExpenseFacade) {}

  @Post('expense/:id/approve')
  @Roles('Manager')
  @ApiOperation({ summary: 'Approve expense claim' })
  @ApiResponse({ type: CommandResponse })
  async approveExpense(@Param('id') id: string, @Body() dto: ApproveExpenseDto): Promise<CommandResponse> {
    await this.facade.executeCommand('APPROVE_EXPENSE', { id, ...dto });
    return { success: true };
  }

  @Post('expense/:id/reject')
  @Roles('Manager')
  @ApiOperation({ summary: 'Reject expense claim' })
  @ApiResponse({ type: CommandResponse })
  async rejectExpense(@Param('id') id: string, @Body() dto: RejectExpenseDto): Promise<CommandResponse> {
    await this.facade.executeCommand('REJECT_EXPENSE', { id, ...dto });
    return { success: true };
  }

  @Post('expense/:id/return')
  @Roles('Manager')
  @ApiOperation({ summary: 'Return expense for correction' })
  @ApiResponse({ type: CommandResponse })
  async returnExpense(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('RETURN_EXPENSE', { id, ...dto });
    return { success: true };
  }

  @Post('travel/:id/approve')
  @Roles('Manager')
  @ApiOperation({ summary: 'Approve travel request' })
  @ApiResponse({ type: CommandResponse })
  async approveTravel(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('APPROVE_TRAVEL', { id, ...dto });
    return { success: true };
  }

  @Post('travel/:id/reject')
  @Roles('Manager')
  @ApiOperation({ summary: 'Reject travel request' })
  @ApiResponse({ type: CommandResponse })
  async rejectTravel(@Param('id') id: string, @Body() dto: RejectExpenseDto): Promise<CommandResponse> {
    await this.facade.executeCommand('REJECT_TRAVEL', { id, ...dto });
    return { success: true };
  }
}
