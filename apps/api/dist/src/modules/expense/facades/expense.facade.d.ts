import { ExpenseOperationEngine } from '../engines/expense-operation.engine';
import { ExpenseEventBus } from '../events/expense-event.bus';
export declare class ExpenseFacade {
    private readonly operationEngine;
    private readonly eventBus;
    constructor(operationEngine: ExpenseOperationEngine, eventBus: ExpenseEventBus);
    executeCommand(commandName: string, payload: any): Promise<any>;
}
//# sourceMappingURL=expense.facade.d.ts.map