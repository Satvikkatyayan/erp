export declare class ExpenseDetailDto {
    claimId: string;
    employeeId: string;
    amount: number;
    currency: string;
    status: string;
    submittedAt?: Date;
    items: Array<{
        itemId: string;
        amount: number;
        category: string;
        description?: string;
        receiptUrl?: string;
    }>;
    history: Array<{
        action: string;
        actedBy: string;
        timestamp: Date;
        comments?: string;
    }>;
}
//# sourceMappingURL=expense-detail.dto.d.ts.map