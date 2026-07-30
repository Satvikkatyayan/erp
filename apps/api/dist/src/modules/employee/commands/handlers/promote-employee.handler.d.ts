import { PromoteEmployeeCommand } from '../promote-employee.command';
import { EmployeeExecutionService } from '../../services/employee-execution.service';
import { PlatformEventPublisher } from '../../../../core/events/platform-event-publisher.service';
export declare class PromoteEmployeeHandler {
    private readonly executionService;
    private readonly publisher;
    constructor(executionService: EmployeeExecutionService, publisher: PlatformEventPublisher);
    execute(command: PromoteEmployeeCommand): Promise<void>;
}
//# sourceMappingURL=promote-employee.handler.d.ts.map