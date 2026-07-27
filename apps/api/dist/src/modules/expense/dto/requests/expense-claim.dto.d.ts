export declare class CreateExpenseClaimDto {
    employeeId: string;
    departmentId: string;
}
export declare class UpdateExpenseClaimDto {
    status?: string;
}
export declare class SubmitExpenseDto {
    claimId: string;
}
export declare class CancelExpenseDto {
    claimId: string;
}
export declare class AddExpenseItemDto {
    amount: number;
    category: string;
}
export declare class RemoveExpenseItemDto {
    itemId: string;
}
export declare class UploadReceiptDto {
    fileUrl: string;
}
//# sourceMappingURL=expense-claim.dto.d.ts.map