import { TerminateEmployeeCommand } from '../terminate-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class TerminateEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: TerminateEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=terminate-employee.handler.d.ts.map