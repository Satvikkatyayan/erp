import { StartPayrollCollectionCommand } from '../start-payroll-collection.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class StartPayrollCollectionHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: StartPayrollCollectionCommand): Promise<void>;
}
//# sourceMappingURL=start-payroll-collection.handler.d.ts.map