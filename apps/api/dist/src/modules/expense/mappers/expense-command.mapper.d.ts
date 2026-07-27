import { CreateExpenseClaimDto, UpdateExpenseClaimDto, SubmitExpenseDto, CancelExpenseDto, AddExpenseItemDto, RemoveExpenseItemDto, UploadReceiptDto } from '../dto/requests/expense-claim.dto';
export declare class ExpenseCommandMapper {
    toCreateCommand(dto: CreateExpenseClaimDto): {
        employeeId: string;
        departmentId: string;
    };
    toUpdateCommand(id: string, dto: UpdateExpenseClaimDto): {
        status?: string;
        id: string;
    };
    toSubmitCommand(dto: SubmitExpenseDto): {
        claimId: string;
    };
    toCancelCommand(dto: CancelExpenseDto): {
        claimId: string;
    };
    toAddItemCommand(claimId: string, dto: AddExpenseItemDto): {
        amount: number;
        category: string;
        claimId: string;
    };
    toRemoveItemCommand(claimId: string, dto: RemoveExpenseItemDto): {
        itemId: string;
        claimId: string;
    };
    toUploadReceiptCommand(claimId: string, dto: UploadReceiptDto): {
        fileUrl: string;
        claimId: string;
    };
}
//# sourceMappingURL=expense-command.mapper.d.ts.map