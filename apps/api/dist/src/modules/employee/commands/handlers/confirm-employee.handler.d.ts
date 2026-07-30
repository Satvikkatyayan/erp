import { ConfirmEmployeeCommand } from '../confirm-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class ConfirmEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: ConfirmEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=confirm-employee.handler.d.ts.map