import { ExpenseFacade } from '../facades/expense.facade';
import { ApproveExpenseDto, RejectExpenseDto } from '../dto/requests/manager-approval.dto';
import { CommandResponse } from '../dto/responses/standard.response';
export declare class ManagerApprovalController {
    private readonly facade;
    constructor(facade: ExpenseFacade);
    approveExpense(id: string, dto: ApproveExpenseDto): Promise<CommandResponse>;
    rejectExpense(id: string, dto: RejectExpenseDto): Promise<CommandResponse>;
    returnExpense(id: string, dto: any): Promise<CommandResponse>;
    approveTravel(id: string, dto: any): Promise<CommandResponse>;
    rejectTravel(id: string, dto: RejectExpenseDto): Promise<CommandResponse>;
}
//# sourceMappingURL=manager-approval.controller.d.ts.map