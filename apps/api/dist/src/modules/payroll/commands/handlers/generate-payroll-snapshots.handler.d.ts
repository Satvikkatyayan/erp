import { GeneratePayrollSnapshotsCommand } from '../generate-payroll-snapshots.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class GeneratePayrollSnapshotsHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: GeneratePayrollSnapshotsCommand): Promise<void>;
}
//# sourceMappingURL=generate-payroll-snapshots.handler.d.ts.map