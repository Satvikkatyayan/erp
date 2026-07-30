export declare class JournalDto {
    id: string;
    tenantId: string;
    payrollRunId: string;
    versionNumber: number;
    status: string;
    createdAt: string;
    entries?: JournalEntryDto[];
}
export declare class JournalEntryDto {
    id: string;
    employeeId: string;
    accountCode: string;
    accountName: string;
    debit: number;
    credit: number;
    currency: string;
    description: string;
    entryType: string;
    checksum: string;
}
export declare class PaymentBatchDto {
    id: string;
    tenantId: string;
    payrollRunId: string;
    versionNumber: number;
    status: string;
    createdAt: string;
    instructions?: PaymentInstructionDto[];
}
export declare class PaymentInstructionDto {
    id: string;
    employeeId: string;
    netPay: number;
    currency: string;
    bankAccountReference: string;
    paymentMethod: string;
    paymentStatus: string;
    referenceNumber?: string;
}
export declare class AdjustmentDto {
    id: string;
    employeeId: string;
    runId?: string;
    type: string;
    amount: number;
    reason: string;
    versionNumber: number;
    status: string;
    createdAt: string;
}
export declare class ArrearDto {
    id: string;
    employeeId: string;
    previousRunId?: string;
    currentRunId?: string;
    reason: string;
    amount: number;
    versionNumber: number;
    status: string;
    createdAt: string;
}
//# sourceMappingURL=financial.dto.d.ts.map