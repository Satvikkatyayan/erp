export class JournalDto {
  id: string;
  tenantId: string;
  payrollRunId: string;
  versionNumber: number;
  status: string;
  createdAt: string;
  entries?: JournalEntryDto[];
}

export class JournalEntryDto {
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

export class PaymentBatchDto {
  id: string;
  tenantId: string;
  payrollRunId: string;
  versionNumber: number;
  status: string;
  createdAt: string;
  instructions?: PaymentInstructionDto[];
}

export class PaymentInstructionDto {
  id: string;
  employeeId: string;
  netPay: number;
  currency: string;
  bankAccountReference: string;
  paymentMethod: string;
  paymentStatus: string;
  referenceNumber?: string;
}

export class AdjustmentDto {
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

export class ArrearDto {
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
