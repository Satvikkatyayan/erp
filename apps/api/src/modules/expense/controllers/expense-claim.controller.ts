import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseFacade } from '../facades/expense.facade';
import { ExpenseCommandMapper } from '../mappers/expense-command.mapper';
import { CreateExpenseClaimDto, UpdateExpenseClaimDto, SubmitExpenseDto, CancelExpenseDto, AddExpenseItemDto, RemoveExpenseItemDto, UploadReceiptDto } from '../dto/requests/expense-claim.dto';
import { CommandResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Expense Claims')
@Controller('expense-claims')
export class ExpenseClaimController {
  constructor(
    private readonly facade: ExpenseFacade,
    private readonly mapper: ExpenseCommandMapper,
  ) {}

  @Post()
  @Roles('Employee')
  @ApiOperation({ summary: 'Create a new expense claim' })
  @ApiResponse({ type: CommandResponse })
  async createClaim(@Body() dto: CreateExpenseClaimDto): Promise<CommandResponse> {
    const command = this.mapper.toCreateCommand(dto);
    await this.facade.executeCommand('CREATE_CLAIM', command);
    return { success: true };
  }

  @Put(':id')
  @Roles('Employee')
  @ApiOperation({ summary: 'Update a draft claim' })
  @ApiResponse({ type: CommandResponse })
  async updateClaim(@Param('id') id: string, @Body() dto: UpdateExpenseClaimDto): Promise<CommandResponse> {
    const command = this.mapper.toUpdateCommand(id, dto);
    await this.facade.executeCommand('UPDATE_CLAIM', command);
    return { success: true };
  }

  @Post(':id/submit')
  @Roles('Employee')
  @ApiOperation({ summary: 'Submit claim for approval' })
  @ApiResponse({ type: CommandResponse })
  async submitClaim(@Param('id') id: string, @Body() dto: SubmitExpenseDto): Promise<CommandResponse> {
    const command = this.mapper.toSubmitCommand({ ...dto, claimId: id });
    await this.facade.executeCommand('SUBMIT_CLAIM', command);
    return { success: true };
  }

  @Post(':id/cancel')
  @Roles('Employee')
  @ApiOperation({ summary: 'Cancel claim' })
  @ApiResponse({ type: CommandResponse })
  async cancelClaim(@Param('id') id: string, @Body() dto: CancelExpenseDto): Promise<CommandResponse> {
    const command = this.mapper.toCancelCommand({ ...dto, claimId: id });
    await this.facade.executeCommand('CANCEL_CLAIM', command);
    return { success: true };
  }

  @Post(':id/items')
  @Roles('Employee')
  @ApiOperation({ summary: 'Add expense item' })
  @ApiResponse({ type: CommandResponse })
  async addItem(@Param('id') id: string, @Body() dto: AddExpenseItemDto): Promise<CommandResponse> {
    const command = this.mapper.toAddItemCommand(id, dto);
    await this.facade.executeCommand('ADD_ITEM', command);
    return { success: true };
  }

  @Delete(':id/items/:itemId')
  @Roles('Employee')
  @ApiOperation({ summary: 'Remove expense item' })
  @ApiResponse({ type: CommandResponse })
  async removeItem(@Param('id') id: string, @Param('itemId') itemId: string, @Body() dto: RemoveExpenseItemDto): Promise<CommandResponse> {
    const command = this.mapper.toRemoveItemCommand(id, { ...dto, itemId });
    await this.facade.executeCommand('REMOVE_ITEM', command);
    return { success: true };
  }

  @Post(':id/receipts')
  @Roles('Employee')
  @ApiOperation({ summary: 'Upload receipt' })
  @ApiResponse({ type: CommandResponse })
  async uploadReceipt(@Param('id') id: string, @Body() dto: UploadReceiptDto): Promise<CommandResponse> {
    const command = this.mapper.toUploadReceiptCommand(id, dto);
    await this.facade.executeCommand('UPLOAD_RECEIPT', command);
    return { success: true };
  }
}
