import { ExpenseFacade } from '../facades/expense.facade';
import { CommandResponse } from '../dto/responses/standard.response';
export declare class ExpenseAdminController {
    private readonly facade;
    constructor(facade: ExpenseFacade);
    overridePolicy(id: string, dto: any): Promise<CommandResponse>;
    approveReimbursement(id: string, dto: any): Promise<CommandResponse>;
    approveAdvance(id: string, dto: any): Promise<CommandResponse>;
    manageBudgets(id: string, dto: any): Promise<CommandResponse>;
    triggerReplay(dto: any): Promise<CommandResponse>;
    triggerRebuild(dto: any): Promise<CommandResponse>;
}
//# sourceMappingURL=expense-admin.controller.d.ts.map