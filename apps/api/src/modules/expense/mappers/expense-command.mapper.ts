import { Injectable } from '@nestjs/common';
import { CreateExpenseClaimDto, UpdateExpenseClaimDto, SubmitExpenseDto, CancelExpenseDto, AddExpenseItemDto, RemoveExpenseItemDto, UploadReceiptDto } from '../dto/requests/expense-claim.dto';

@Injectable()
export class ExpenseCommandMapper {
  toCreateCommand(dto: CreateExpenseClaimDto) {
    return { ...dto };
  }

  toUpdateCommand(id: string, dto: UpdateExpenseClaimDto) {
    return { id, ...dto };
  }

  toSubmitCommand(dto: SubmitExpenseDto) {
    return { ...dto };
  }

  toCancelCommand(dto: CancelExpenseDto) {
    return { ...dto };
  }

  toAddItemCommand(claimId: string, dto: AddExpenseItemDto) {
    return { claimId, ...dto };
  }

  toRemoveItemCommand(claimId: string, dto: RemoveExpenseItemDto) {
    return { claimId, ...dto };
  }

  toUploadReceiptCommand(claimId: string, dto: UploadReceiptDto) {
    return { claimId, ...dto };
  }
}
