import { ExpenseFacade } from '../facades/expense.facade';
import { ExpenseCommandMapper } from '../mappers/expense-command.mapper';
import { CreateExpenseClaimDto, UpdateExpenseClaimDto, SubmitExpenseDto, CancelExpenseDto, AddExpenseItemDto, RemoveExpenseItemDto, UploadReceiptDto } from '../dto/requests/expense-claim.dto';
import { CommandResponse } from '../dto/responses/standard.response';
export declare class ExpenseClaimController {
    private readonly facade;
    private readonly mapper;
    constructor(facade: ExpenseFacade, mapper: ExpenseCommandMapper);
    createClaim(dto: CreateExpenseClaimDto): Promise<CommandResponse>;
    updateClaim(id: string, dto: UpdateExpenseClaimDto): Promise<CommandResponse>;
    submitClaim(id: string, dto: SubmitExpenseDto): Promise<CommandResponse>;
    cancelClaim(id: string, dto: CancelExpenseDto): Promise<CommandResponse>;
    addItem(id: string, dto: AddExpenseItemDto): Promise<CommandResponse>;
    removeItem(id: string, itemId: string, dto: RemoveExpenseItemDto): Promise<CommandResponse>;
    uploadReceipt(id: string, dto: UploadReceiptDto): Promise<CommandResponse>;
}
//# sourceMappingURL=expense-claim.controller.d.ts.map