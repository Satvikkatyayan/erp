import { TransferEmployeeCommand } from '../transfer-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class TransferEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: TransferEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=transfer-employee.handler.d.ts.map